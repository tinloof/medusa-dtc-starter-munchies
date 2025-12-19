import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Sanity } from "@medusajs/icons";
import {
  Badge,
  Button,
  Container,
  Heading,
  Table,
  Toaster,
  toast,
} from "@medusajs/ui";
import { useSanitySyncs, useTriggerSanitySync } from "../../hooks/sanity";

const SanityRoute = () => {
  const { mutateAsync, isPending } = useTriggerSanitySync();
  const { workflow_executions, refetch } = useSanitySyncs();

  const handleSync = async () => {
    try {
      await mutateAsync(undefined);
      toast.success("Sync triggered.");
      refetch();
    } catch (err: any) {
      toast.error(`Couldn't trigger sync: ${err.message}`);
    }
  };

  const getBadgeColor = (state: string) => {
    switch (state) {
      case "invoking":
        return "blue";
      case "done":
        return "green";
      case "failed":
        return "red";
      default:
        return "grey";
    }
  };

  return (
    <>
      <Container className="flex flex-col overflow-hidden p-0">
        <div className="flex justify-between p-6">
          <Heading className="h1-core font-medium font-sans">
            Sanity Syncs
          </Heading>
          <Button
            disabled={isPending}
            onClick={handleSync}
            size="small"
            variant="secondary"
          >
            Trigger Sync
          </Button>
        </div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sync ID</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Created At</Table.HeaderCell>
              <Table.HeaderCell>Updated At</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {(workflow_executions || []).map((execution) => (
              <Table.Row
                className="cursor-pointer"
                key={execution.id}
                onClick={() => {
                  window.location.href = `/app/sanity/${execution.id}`;
                }}
              >
                <Table.Cell>{execution.id}</Table.Cell>
                <Table.Cell>
                  <Badge
                    color={getBadgeColor(execution.state)}
                    rounded="full"
                    size="2xsmall"
                  >
                    {execution.state}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{execution.created_at}</Table.Cell>
                <Table.Cell>{execution.updated_at}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
      <Toaster />
    </>
  );
};

export const config = defineRouteConfig({
  label: "Sanity",
  icon: Sanity,
});

export default SanityRoute;
