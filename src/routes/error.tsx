import { Card, CardBody } from "@nextui-org/card";
import { useSearchParams } from "react-router-dom";

export const Error = () => {
  const [searchParams] = useSearchParams();
  return (
    <Card>
      <CardBody>
        <h1 className="text-large text-bold">Error: {searchParams.get("status")}</h1>
        <p>{searchParams.get("message")}</p>
      </CardBody>
    </Card>
  );
};
