export default function SectionHeaders({ subHeader, mainHeader }) {
  return (
    <>
      <h3 className="text-gray-500 font-semibold text-center">{subHeader}</h3>
      <h2 className="uppercase text-center text-primary font-bold text-3xl italic">
        {mainHeader}
      </h2>
    </>
  );
}
