# **My-strava**

[![node](https://img.shields.io/badge/node-18-F82F82)](https://nodejs.org/docs/latest-v16.x/api)
![node](https://img.shields.io/badge/typescript-gray?logo=typescript)

[![Firebase](https://img.shields.io/badge/firebase-gray?logo=firebase)](https://console.firebase.google.com)
[![React](https://img.shields.io/badge/react-gray?logo=react)](https://react.dev)
[![Next.js](https://img.shields.io/badge/next.js-gray?logo=next.js)](https://nextjs.org/)
[![styled-component](https://img.shields.io/badge/styled-component-gray?logo=styled-component)](https://nextjs.org/)
![react-query](https://img.shields.io/badge/react-qurey-gray?logo=react-query)

## **Contents**

- [**My-strava**](#my-strava)
    - [**Requirements**](#requirements)
    - [**Build**](#build)
        - [**Next.js**](#nextjs-debug)
    - [**Code Managing**](#code-managing)
        - [코드 작성시 유의 사항](#코드-작성시-유의-사항)
        - [코드 형상 관리](#코드-형상-관리)
    - [**Code Structure**](#code-structure)

## **Requirements**

1. Node : 18.13.0
2. Typescript : 5.0.4
3. React : 18
4. React-query : 4.29.11
5. Recoil : 0.7.7
6. Husky : 8.0.3
7. Styled-Component : 5.3.10
8. ESLint : 8.39.0
9. Prettier : 2.8.7
10. Jest : 29.5.0

## **Build**

### **nextjs** (Debug)

1. yarn 명령어 이용하여 빌드

   ```bash
   yarn serve # firebase emulator 실행
   yarn dev 
   ```

## **Code Managing**

### 코드 작성시 유의 사항

**1. state 관리 방법**

- `Recoil`

    - App.ts 라이프사이클을 따라가는 state 관리 라이브러리
    - 로컬 state 관리시 사용(Context 대신 사용한다고 보면 됨)

- `React Query`
    - Recoil 사용하는 경우를 제외한 나머지는 리액트 쿼리 통해 데이터 흐름 관리
    - 데이터 패치, 에러 핸들링, 캐싱, Repository, Persist 관련 작업시 사용

**2. jest 유닛 테스트 시 체크 리스트**

- `__tests__ 폴더에 테스트 코드 작성`
- testID 작성 규칙
    - `@{component name}/{내부 component name}` 같은 형식으로 작성
    - 예시 : @checkbox/box

**3. 타입 정의 관련 유의 사항**

- IDE에서 타입 확인이 쉽도록 타입 정의
- global.d.ts : 글로벌 타입 정의

**4. 외부 라이브러리 관련 유의 사항**

- 외부 라이브러리는 src/lib 하위 파일 통해 사용할 수 있어야함
- import 외부라이브러리 from '@lib/외부라이브러리' 같은 형식으로 사용

**5. Asset 관련 유의 사항**

- src/UI/assets : 코드에서 쓰는 리소스 관리

### 코드 형상 관리

**1. 브랜치 이름 명명 규칙**

- `prefix/기능` 형식으로 영문 작성 (대문자 포함되지 않도록 유의)
- git flow에 따라 브랜치 이름 prefix 명명
  ```
  main
  develop
  feature
  ```
- 예시: feature/call, feature/event-api

**2. 커밋 메시지 명명 규칙**

- `[tag] 커밋 메시지`, `[tag1][tag2] 커밋 메시지` 같은 형식으로 작성
- tag 종류

  ```
  bugfix : 버그 수정
  feat : 기능 구현
  chore : 라이브러리 버전 변경
  refactor : 소스 리팩토링
  ```

**3. rebase를 이용하여 로컬 브랜치 병합 진행**

- merge를 쓰는 경우, merge commit 이력이 로컬 브랜치에 남게 됨
- develop, main(master) 브랜치에서 pull request에 대한 merge commit을 구분하는데 혼동을 막고 commit 이력 추적이 쉽도록 rebase 사용
- rebase는 시간 순으로 변경 이력을 파악하므로 conflict가 여러번 발생함

**4. 로컬에서 원격 develop 브랜치로 직접 커밋 X, Pull Request 통한 소스 병합 진행**

```bash
feature/branchname> git commit [feat] commit message #브랜치 이름 확인!
feature/branchname> git push origin feature/branchname

# GitHub 접속하여 feature/branchname -> develop Pull Request 작성
```

## **Code Structure**
feature 별로 폴더를 나누어 관리
- [**src**](src/ui/README.md)
    - assets
    - components
        - atom
        - molecule
        - organism
        - template
    - hooks
      - media
        - useIntersectionObserver
        - useMediaQuery
        - useScrollEnd
        - useThemeMode
    - lib
    - features
      - Account
      - Activity
      - Feed
      - Heatmap
      - Home
      - Plan
    - styles
      - theme
    - utils
