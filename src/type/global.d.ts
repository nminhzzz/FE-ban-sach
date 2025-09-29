export {};

declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }
  interface ILogin {
    access_token: string;
    user: {
      email: string;
      phone: string;
      fullName: string;
      role: string;
      avatar: string;
      _id: string;
    };
  }
  interface UserSendRegister {
    fullName: string;
    email: string;
    password: string;
    phone: string;
  }
  interface UserGetRegister {
    _id: string;
    email: string;
    fullName: string;
  }
  interface IUser {
    email: string;
    phone: string;
    fullName: string;
    role: string;
    avatar: string;
    id: string;
  }
  interface AdminUser {
    email: string;
    phone: string;
    fullName: string;
    role: string;
    avatar: string;
    _id: string;
  }

  interface UserTable {
    email: string;
    phone: string;
    fullName: string;
    role: string;
    avatar: string;
    _id: string;
    createdAt: Date;
    isActive: boolean;
  }
  interface IFetchAccount {
    user: IUser;
  }
  interface UserListUpLoad {
    fullName: string;
    password: string;
    email: string;
    phone: string;
  }
  interface DataUpLoadFile {
    countSuccess: number;
    countError: number;
    detail: [];
  }
  interface ImageUpLoad {
    fileUploaded: string;
  }
  interface IBook {
    _id: string;
    thumbnail: string;
    slider: string[];
    mainText: string;
    author: string;
    price: number;
    sold: number;
    quantity: number;
    category: string;
    createdAt: Date;
    updatedAt: Date;
  }
  interface DashBroad {
    countOrder: number;
    countUser: number;
    countBook: number;
  }
  interface ICarts {
    id: string;
    quantityProducts: number;
    detail: IBook;
  }
  interface IOrder<T> {
    name: string;
    address: string;
    phone: string;
    totalPrice: number;
    type: string;
    paymentRef?: string;
    detail: T[];
  }

  interface IItemOrder {
    bookName: string;
    quantity: number;
    _id: string;
  }
  interface IHistory {
    _id: string;
    name: string;
    type: string;
    email: string;
    phone: string;
    userId: string;
    detail: {
      bookName: string;
      quantity: number;
      _id: string;
    }[];
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
    paymentStatus: string;
    paymentRef: string;
  }

  interface IDataHistory<T> {
    _id: string;
    name: string;
    type: string;
    email: string;
    phone: string;
    userId: string;
    detail: T[];
    totalPrice: number;
    paymentStatus: string;
    paymentRef: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  interface ApiResponse {
    statusCode: number;
    message: string;
    data: {
      meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
      };
      result: Order[];
    };
    author: string;
  }

  interface Order {
    _id: string;
    name: string;
    address: string;
    phone: string;
    type: string;
    paymentStatus: string;
    paymentRef: string;
    detail: OrderDetail[];
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  interface OrderDetail {
    bookName: string;
    quantity: number;
    _id: string;
  }
}
