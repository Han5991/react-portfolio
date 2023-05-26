import {SubMenu, MainMenu, MainMenuShow, LeftMenuShow} from './types';

import {atom, selector} from '@lib/recoil';

const mainMenuShowState = atom<MainMenuShow>({
  key: 'mainMenuShow',
  default: false,
});

const leftMenuShowState = atom<LeftMenuShow>({
  key: 'leftMenuShow',
  default: {show: false},
});

const subMenuState = atom<SubMenu[]>({
  key: 'subMenu',
  default: [],
});

const dummySubMenu: SubMenu[] = [
  {
    id: 0,
    title: '서브메뉴1',
    content: [
      {id: 0, title: '서브메뉴 콘텐츠1', link: '/'},
      {id: 1, title: '서브메뉴 콘텐츠2', link: '/'},
      {id: 2, title: '서브메뉴 콘텐츠3', link: '/'},
    ],
  },
  {
    id: 1,
    title: '서브메뉴2',
    content: [
      {id: 0, title: '서브메뉴 콘텐츠1', link: '/'},
      {id: 1, title: '서브메뉴 콘텐츠2', link: '/'},
      {id: 2, title: '서브메뉴 콘텐츠3', link: '/'},
    ],
  },
  {
    id: 2,
    title: '서브메뉴3',
    content: [
      {id: 0, title: '서브메뉴 콘텐츠1', link: '/'},
      {id: 1, title: '서브메뉴 콘텐츠2', link: '/'},
      {id: 2, title: '서브메뉴 콘텐츠3', link: '/'},
    ],
  },
];

const mainMenuState = atom<MainMenu[]>({
  key: 'mainMenu',
  default: [
    {
      id: 0,
      title: '메인메뉴1',
      link: '/',
      subMenu: [...dummySubMenu],
    },
    {
      id: 1,
      title: '메인메뉴2',
      link: '/',
      subMenu: [...dummySubMenu],
    },
  ],
});

export const mainMenuSelector = selector({
  key: 'mainMenuSelector',
  get: ({get}) => get(mainMenuState),
  set: ({set}, newValue) => set(mainMenuState, newValue),
});

export const subMenuSelector = selector({
  key: 'subMenuSelector',
  get: ({get}) => get(subMenuState),
  set: ({set}, newValue) => set(subMenuState, newValue),
});

export const mainMenuShowSelector = selector({
  key: 'mainMenuShowSelector',
  get: ({get}) => get(mainMenuShowState),
  set: ({set}, newValue) => set(mainMenuShowState, newValue),
});

export const leftMenuShowSelector = selector({
  key: 'leftMenuShowSelector',
  get: ({get}) => get(leftMenuShowState),
  set: ({set}, newValue) => set(leftMenuShowState, newValue),
});
