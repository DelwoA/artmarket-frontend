type Props = {
  description: string;
};

const BodyContent = ({ description }: Props) => {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      {description.split("\n").map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
    </article>
  );
};

export default BodyContent;
