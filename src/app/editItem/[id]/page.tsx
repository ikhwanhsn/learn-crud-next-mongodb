import EditItem from "@/components/EditItem";

const editPage = ({ params }: any) => {
  const { id } = params;

  return <EditItem id={id} />;
};

export default editPage;
