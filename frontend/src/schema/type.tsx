export type User = {
  name: string | undefined | null;
  email: string | undefined | null;
  image: string | undefined | null;
  id: string | undefined | null;
};
export type category = {
  title: string;
  img: string;
};
export type comment = {
  id: string | undefined | null;
  desc: string;
  userEmail: { name: string; image: string };
  createdAt: string;
};
export type post = {
  category: string;
  desc: string;
  id: string;
  img: string;
  title: string;
  createdAt: string;
  userEmail: {
    name: string;
    image: string;
    email: string;
  };
};
