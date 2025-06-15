import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";

const HowItWorksCard = ({
  title,
  label,
  description,
}: {
  title: string;
  label: string;
  description: string;
}) => {
  return (
    <Card className="max-w-[240px]" variant="elevated">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default HowItWorksCard;
