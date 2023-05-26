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

export type MainMenuShow = false | true;

export type LeftMenuShow = {
  show: false | true;
  content?: SubMenu[];
};
