//create url path
const createURL = (path: string) => window.location.origin + path;

export const updateEntry = async (id: any, content: any) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ content }),
    })
  );

  if (res.ok) {
    const data = await res.json();
    console.log("Data from update", data);
    return data.data;
  } else {
    throw new Error("Something went wrong on API server!");
  }
};

export const newEntry = async () => {
  const res = await fetch(
    new Request(createURL("/api/journal"), {
      method: "POST",
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  } else {
    throw new Error("Something went wrong on API server!");
  }
};

export const askQuestion = async (question: any) => {
  const res = await fetch(
    new Request(createURL(`/api/question`), {
      method: "POST",
      body: JSON.stringify({ question }),
    })
  );

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Something went wrong on API server!");
  }
};
