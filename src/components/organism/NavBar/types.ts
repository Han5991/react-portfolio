type Content = {
  id: number;
  title: string;
  link: string;
};

export type SubMenu = Omit<Content, 'link'> & {
  content: Content[];
};

export type MainMenu = Content & {
  subMenu: SubMenu[];
};

export type MainMenuShow = boolean;

export type LeftMenuShow = {
  show: boolean;
  content?: SubMenu[];
};
