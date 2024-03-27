import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SchemaTable({ schema }: { schema: GeneralSchema[] }) {
  return (
    <div className="max-w-lg">
      <h2 className="my-2">Schema for your endpoint</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Field</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schema.map((field) => (
            <TableRow>
              <TableCell>{field?.key}</TableCell>
              <TableCell>{field?.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
