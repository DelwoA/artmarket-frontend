type Props = {
  bio: string;
};

const About = ({ bio }: Props) => {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold mb-2">About</h2>
      <p className="text-sm md:text-base text-muted-foreground whitespace-pre-line">
        {bio}
      </p>
    </section>
  );
};

export default About;
