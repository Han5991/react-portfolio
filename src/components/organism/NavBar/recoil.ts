import {SubMenu, MainMenu, MainMenuShow, LeftMenuShow} from './types';

import {atom, selector} from '@lib/recoil';

const topNavShowState = atom({
  key: 'topNavShow',
  default: '0px',
});

const dataLoadingState = atom({
  key: 'dataLoading',
  default: true,
});

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

const mainMenuState = atom<MainMenu[]>({
  key: 'mainMenu',
  default: [
    {
      id: 0,
      title: '활동내역',
      link: '/',
      subMenu: [
        {
          id: 0,
          title: '활동피드',
          content: [{id: 0, title: '활동피드', link: '/feed'}],
        },
        {
          id: 1,
          title: '히트맵',
          content: [{id: 0, title: '히트맵', link: '/'}],
        },
      ],
    },
    {
      id: 1,
      title: '트레이닝',
      link: '/',
      subMenu: [
        {
          id: 0,
          title: '로그',
          content: [{id: 0, title: '로그', link: '/'}],
        },
        {
          id: 1,
          title: '계획',
          content: [{id: 0, title: '계획', link: '/'}],
        },
      ],
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

export const dataLoadingSelector = selector({
  key: 'dataLoadingSelector',
  get: ({get}) => get(dataLoadingState),
  set: ({set}, newValue) => set(dataLoadingState, newValue),
});

export const topNavShowSelector = selector({
  key: 'topNavShowSelector',
  get: ({get}) => get(topNavShowState),
  set: ({set}, newValue) => set(topNavShowState, newValue),
});
