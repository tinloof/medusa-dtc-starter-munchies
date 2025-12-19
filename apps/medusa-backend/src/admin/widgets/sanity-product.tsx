import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { ArrowUpRightOnBox } from "@medusajs/icons";
import { Button, CodeBlock, Container, StatusBadge, toast } from "@medusajs/ui";
import { useState } from "react";
import {
  useSanityDocument,
  useTriggerSanityProductSync,
} from "../hooks/sanity";

const ProductWidget = ({ data }: { data: any }) => {
  const { mutateAsync, isPending } = useTriggerSanityProductSync(data.id);
  const { sanity_document, studio_url, isLoading } = useSanityDocument(data.id);
  const [showCodeBlock, setShowCodeBlock] = useState(false);

  const handleSync = async () => {
    try {
      await mutateAsync();
      toast.success("Sync triggered.");
    } catch (err: any) {
      toast.error(`Couldn't trigger sync: ${err.message}`);
    }
  };

  const renderStatusBadge = () => {
    if (isLoading) {
      return "Loading...";
    }
    if (sanity_document?.handle === data.handle) {
      return <StatusBadge color="green">Synced</StatusBadge>;
    }
    return <StatusBadge color="red">Not Synced</StatusBadge>;
  };

  return (
    <Container>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <h2>Sanity Status</h2>
          <div>{renderStatusBadge()}</div>
        </div>
        <Button
          disabled={isPending}
          onClick={handleSync}
          size="small"
          variant="secondary"
        >
          Sync
        </Button>
      </div>
      <div className="mt-6">
        <div className="mb-4 flex gap-4">
          <Button
            onClick={() => setShowCodeBlock(!showCodeBlock)}
            size="small"
            variant="secondary"
          >
            {showCodeBlock ? "Hide" : "Show"} Sanity Document
          </Button>
          <a href={studio_url} rel="noreferrer" target="_blank">
            <Button variant="transparent">
              <ArrowUpRightOnBox /> Sanity Studio
            </Button>
          </a>
        </div>
        {!isLoading && showCodeBlock && (
          <CodeBlock
            className="dark"
            snippets={[
              {
                language: "json",
                label: "Sanity Document",
                code: JSON.stringify(sanity_document, null, 2),
              },
            ]}
          >
            <CodeBlock.Body />
          </CodeBlock>
        )}
      </div>
    </Container>
  );
};

// The widget's configurations
export const config = defineWidgetConfig({
  zone: "product.details.after",
});

export default ProductWidget;
