export type User = {
    name: string | undefined | null;
    email: string | undefined | null;
    image: string | undefined | null;
  };
  export type post = {
    category: string;
    desc: string;
    id: string;
    img?: string;
    title: string;
    createdAt: string;
    userEmail: {
      name: string;
      image: string;
      email: string;
    };
  };