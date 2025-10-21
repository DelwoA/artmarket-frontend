type Props = {
  description: string;
};

const BodyContent = ({ description }: Props) => {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert mt-12 mb-11">
      {description.split("\n").map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
    </article>
  );
};

export default BodyContent;
