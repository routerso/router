import { getLeadsByEndpoint } from "@/lib/data/leads";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Page({ params }: { params: { id: string } }) {
  const { leadData: leads, schema } = await getLeadsByEndpoint(params.id);
  console.log(leads);
  console.log(schema);
  return (
    <>
      <h1>test</h1>
      <Table className="not-prose">
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            {schema.map((column) => (
              <TableCell key={column.key}>{column.key}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead, rowIndex) => (
            <TableRow key={rowIndex}>
              {schema.map((column) => (
                <TableCell key={column.key}>{lead.data[column.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
