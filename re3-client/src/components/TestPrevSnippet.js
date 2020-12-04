const TestPrevSnippet = ({goback}) => {
  const prevsnippet = async () => {
      goback();
    };
  return (
    <button onClick={() => prevsnippet()}className="text-xl font-robot px-8 py-3 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer rounded-md"
        >
            Back
    </button>
  );
};

export default TestPrevSnippet;