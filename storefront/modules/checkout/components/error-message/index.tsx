import Body from "@/components/shared/typography/body";

const ErrorMessage = ({
  "data-testid": dataTestid,
  error,
}: {
  "data-testid"?: string;
  error?: null | string;
}) => {
  if (!error) {
    return null;
  }

  return (
    <div
      className="text-small-regular pt-2 text-rose-500"
      data-testid={dataTestid}
    >
      <Body font="sans">{error}</Body>
    </div>
  );
};

export default ErrorMessage;
