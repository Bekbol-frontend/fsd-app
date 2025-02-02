import { IUser } from "@/entities/User";

export enum ArticleTypes {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  CODE = "CODE",
}

export interface IArticleBaseBlock {
  _id: string;
  type: ArticleTypes;
}

export interface IArticleTextBlock extends IArticleBaseBlock {
  type: ArticleTypes.TEXT;
  title: string;
  paragraphs: string[];
}

export interface IArticleImageBlock extends IArticleBaseBlock {
  type: ArticleTypes.IMAGE;
  src: string;
  title: string;
}

export interface IArticleCodeBlock extends IArticleBaseBlock {
  type: ArticleTypes.CODE;
  code: string;
}

export type ArticleBlocks =
  | IArticleTextBlock
  | IArticleImageBlock
  | IArticleCodeBlock;

export interface IArticle {
  _id: string;
  user: IUser;
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: string[];
  blocks: ArticleBlocks[];
}

export interface IArticleDetailSchema {
  isLoading: boolean;
  error?: string;
  article: IArticle | null;
}

export enum ArticleView {
  BIG = "big",
  SMALL = "small",
}
