import axios from "./api.customs";

export const loginAPI = (username: string, password: string) => {
  const URL_BACKEND = "/api/v1/auth/login";
  const data = { username, password };
  return axios.post<IBackendRes<ILogin>>(URL_BACKEND, data);
};
export const Register = (
  fullName: string,
  email: string,
  password: string,
  phone: string
) => {
  const URL_API = "/api/v1/user/register";
  return axios.post<IBackendRes<UserGetRegister>>(URL_API, {
    fullName,
    email,
    password,
    phone,
  });
};
export const FetchAccount = () => {
  const URL_API = "/api/v1/auth/account";
  return axios.get<IBackendRes<IFetchAccount>>(URL_API, {
    timeout: 3000,
  });
};
export const LogoutAPI = () => {
  const URL_API = "/api/v1/auth/logout";
  return axios.post<IBackendRes<string>>(URL_API);
};
export const GetUser = (current: number, pageSize: number) => {
  const URL_API = `/api/v1/user?current=${current}&pageSize=${pageSize}`;

  return axios.get<IBackendRes<IModelPaginate<UserTable>>>(URL_API);
};

export const CreateUser = (
  fullName: string,
  password: string,
  email: string,
  phone: string
) => {
  const URL_API = `/api/v1/user`;
  return axios.post<IBackendRes<IUser>>(URL_API, {
    fullName,
    password,
    email,
    phone,
  });
};
export const UpdateUser = (_id: string, fullName: string, phone: string) => {
  const URL_API = `/api/v1/user`;
  return axios.put<IBackendRes<[]>>(URL_API, {
    _id,
    fullName,
    phone,
  });
};
export const DeleteUser = (id: string) => {
  const URL_API = `/api/v1/user/${id}`;
  return axios.delete<IBackendRes<[]>>(URL_API);
};

export const UploadListUser = (users: UserListUpLoad[]) => {
  const URL_API = `/api/v1/user/bulk-create`;
  return axios.post<IBackendRes<DataUpLoadFile>>(URL_API, users);
};

export const UpLoadImage = (formData: FormData, folder: string) => {
  const URL_API = `/api/v1/file/upload`;
  return axios.post<IBackendRes<ImageUpLoad>>(URL_API, formData, {
    headers: {
      "upload-type": folder,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const UpdateInfo = (
  fullName: string,
  phone: string,
  avatar: string,
  _id: string
) => {
  const URL_API = `/api/v1/user`;
  return axios.put<IBackendRes<string>>(URL_API, {
    fullName,
    phone,
    avatar,
    _id,
  });
};
export const UpdatePassWord = (
  email: string,
  oldpass: string,
  newpass: string
) => {
  const URL_API = `/api/v1/user/change-password`;
  return axios.post<IBackendRes<string>>(URL_API, {
    email,
    oldpass,
    newpass,
  });
};
export const GetBook = (current: number, pageSize: number) => {
  const URL_API = `/api/v1/book?current=${current}&pageSize=${pageSize}`;

  return axios.get<IBackendRes<IModelPaginate<IBook>>>(URL_API);
};

export const CreateBook = (
  thumbnail: string,
  slider: string[],
  mainText: string,
  author: string,
  price: number,
  quantity: number,
  category: string
) => {
  const URL_API = `/api/v1/book`;
  return axios.post<IBackendRes<IBook>>(URL_API, {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    quantity,
    category,
  });
};
export const UpdateBook = (
  _id: string,
  thumbnail: string,
  slider: string[],
  mainText: string,
  author: string,
  price: number,
  quantity: number,
  category: string
) => {
  const URL_API = `/api/v1/book/${_id}`;
  return axios.put<IBackendRes<IBook>>(URL_API, {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    quantity,
    category,
  });
};

export const DeleteBook = (_id: String) => {
  const URL_API = `/api/v1/book/${_id}`;
  return axios.delete<IBackendRes<string[]>>(URL_API);
};

export const GetBookSearch = (URL_API: String) => {
  return axios.get<IBackendRes<IModelPaginate<IBook>>>(`${URL_API}`);
};

export const GetDashBroad = () => {
  return axios.get<IBackendRes<DashBroad>>(`/api/v1/database/dashboard`);
};

export const GetReducePriceBook = (current: number, pageSize: number) => {
  const URL_API = `/api/v1/book?current=${current}&pageSize=${pageSize}&sort=-price`;

  return axios.get<IBackendRes<IModelPaginate<IBook>>>(URL_API);
};
export const GetIncreasePriceBook = (current: number, pageSize: number) => {
  const URL_API = `/api/v1/book?current=${current}&pageSize=${pageSize}&sort=price`;

  return axios.get<IBackendRes<IModelPaginate<IBook>>>(URL_API);
};
export const GetNewBook = (current: number, pageSize: number) => {
  const URL_API = `/api/v1/book?current=${current}&pageSize=${pageSize}&sort=-createdAt`;

  return axios.get<IBackendRes<IModelPaginate<IBook>>>(URL_API);
};
export const GetCategory = () => {
  return axios.get<IBackendRes<[]>>(`/api/v1/database/category`);
};
export const GetBookCategory = (
  listCategory: String,
  current: number,
  pageSize: number
) => {
  return axios.get<IBackendRes<IModelPaginate<IBook>>>(
    `/api/v1/book?current=${current}&pageSize=${pageSize}&category=${listCategory}`
  );
};
export const GetBookId = (id: String) => {
  return axios.get<IBackendRes<IBook>>(`/api/v1/book/${id}`);
};
export const orderAPI = (data: IOrder<IItemOrder>) => {
  const URL_BACKEND = `/api/v1/order`;
  return axios.post<IBackendRes<IBook>>(URL_BACKEND, data);
};
export const getVNPayUrlAPI = (
  amount: number,
  locale: string,
  paymentRef: string
) => {
  const URL_BACKEND = "/vnpay/payment-url";
  return axios.post<IBackendRes<{ url: string }>>(URL_BACKEND, {
    amount,
    locale,
    paymentRef,
  });
};
export const historyAPI = () => {
  const URL_BACKEND = `api/v1/history`;
  return axios.get<IBackendRes<IHistory[]>>(URL_BACKEND);
};

export const orderAdminAPI = (query: string) => {
  const urlBackend = `/api/v1/order?${query}`;
  return axios.get<ApiResponse>(urlBackend);
};
