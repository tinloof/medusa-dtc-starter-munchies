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
      await mutateAsync({});
      toast.success(`Sync triggered.`);
      refetch();
    } catch (err) {
      toast.error(`Couldn't trigger sync: ${err.message}`);
    }
  };

  const getBadgeColor = (state) => {
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
      <Container className="flex flex-col p-0 overflow-hidden">
        <div className="p-6 flex justify-between">
          <Heading className="font-sans font-medium h1-core">
            Sanity Syncs
          </Heading>
          <Button
            variant="secondary"
            size="small"
            onClick={handleSync}
            disabled={isPending}
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
                key={execution.id}
                className="cursor-pointer"
                onClick={() =>
                  (window.location.href = `/app/sanity/${execution.id}`)
                }
              >
                <Table.Cell>{execution.id}</Table.Cell>
                <Table.Cell>
                  <Badge
                    rounded="full"
                    size="2xsmall"
                    color={getBadgeColor(execution.state)}
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
