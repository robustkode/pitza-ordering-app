export default function SectionHeaders({ main, sub }) {
  return (
    <>
      <h2 className="uppercase text-center  font-bold text-2xl ">{main}</h2>
      <h3 className="text-gray-500 font-semibold text-center">{sub}</h3>
    </>
  );
}
