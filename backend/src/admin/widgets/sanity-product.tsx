import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { ArrowUpRightOnBox } from "@medusajs/icons";
import { Button, CodeBlock, Container, StatusBadge, toast } from "@medusajs/ui";
import { useState } from "react";
import {
  useSanityDocument,
  useTriggerSanityProductSync,
} from "../hooks/sanity";

const ProductWidget = ({ data }) => {
  const { mutateAsync, isPending } = useTriggerSanityProductSync(data.id);
  const { sanity_document, studio_url, isLoading } = useSanityDocument(data.id);
  const [showCodeBlock, setShowCodeBlock] = useState(false);

  const handleSync = async () => {
    try {
      await mutateAsync({});
      toast.success(`Sync triggered.`);
    } catch (err) {
      toast.error(`Couldn't trigger sync: ${err.message}`);
    }
  };

  return (
    <Container>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2 items-center">
          <h2>Sanity Status</h2>
          <div>
            {isLoading ? (
              "Loading..."
            ) : sanity_document.handle === data.handle ? (
              <StatusBadge color="green">Synced</StatusBadge>
            ) : (
              <StatusBadge color="red">Not Synced</StatusBadge>
            )}
          </div>
        </div>
        <Button
          size="small"
          variant="secondary"
          onClick={handleSync}
          disabled={isPending}
        >
          Sync
        </Button>
      </div>
      <div className="mt-6">
        <div className="mb-4 flex gap-4">
          <Button
            size="small"
            variant="secondary"
            onClick={() => setShowCodeBlock(!showCodeBlock)}
          >
            {showCodeBlock ? "Hide" : "Show"} Sanity Document
          </Button>
          <a href={studio_url} target="_blank" rel="noreferrer">
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
