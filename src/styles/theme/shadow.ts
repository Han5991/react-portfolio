const styled = {
  0: `shadow-offset: 0px 1px; shadow-opacity: 0.18; shadow-radius: 1.00px; elevation: 1;`,
  1: `shadow-offset: 0px 1px; shadow-opacity: 0.20; shadow-radius: 1.41px; elevation: 2;`,
  2: `shadow-offset: 0px 1px; shadow-opacity: 0.22; shadow-radius: 2.22px; elevation: 3;`,
  3: `shadow-offset: 0px 2px; shadow-opacity: 0.23; shadow-radius: 2.62px; elevation: 4;`,
  4: `shadow-offset: 0px 2px; shadow-opacity: 0.25; shadow-radius: 3.84px; elevation: 5;`,
  5: `shadow-offset: 0px 3px; shadow-opacity: 0.27; shadow-radius: 4.65px; elevation: 6;`,
  6: `shadow-offset: 0px 3px; shadow-opacity: 0.29; shadow-radius: 4.65px; elevation: 7;`,
  7: `shadow-offset: 0px 4px; shadow-opacity: 0.30; shadow-radius: 4.65px; elevation: 8;`,
  8: `shadow-offset: 0px 4px; shadow-opacity: 0.32; shadow-radius: 5.46px; elevation: 9;`,
  9: `shadow-offset: 0px 5px; shadow-opacity: 0.34; shadow-radius: 6.27px; elevation: 10;`,
} as const;

const shadow = {
  styled,
  0: {
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  1: {
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  2: {
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  3: {
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  4: {
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  5: {
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  6: {
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  7: {
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  8: {
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  9: {
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
} as const;

export default shadow;
