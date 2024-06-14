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
    <div className="max-w-lg pb-6 prose dark:prose-invert">
      <h3>Schema</h3>
      <Table className="not-prose">
        <TableHeader>
          <TableRow>
            <TableHead>Field</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schema.map((field, index) => (
            <TableRow key={index}>
              <TableCell>{field?.key}</TableCell>
              <TableCell>{field?.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
