import EditItem from "@/components/EditItem";

const EditPage = ({ params }: any) => {
  const { id } = params;

  return <EditItem id={id} />;
};

export default EditPage;
