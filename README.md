# 파티원구함

![Node badge](https://img.shields.io/badge/Node-v18.+-%23ff6e40)
![Build badge](https://img.shields.io/badge/Build-nuxt3-%23ff6e40)
![License badge](https://img.shields.io/badge/License-MIT-%23ff6e40)

&nbsp;

## 파티원구함의 주요 기능

### 📅 약속 생성

> 인원수, 날짜, 시간, 알림 설정을 하고 약속 생성 버튼을 누르면 약속 페이지가 생성됩니다. 약속 페이지의 링크를 공유해 인원수가 채워지면 타임라인의 색이 진해집니다.

<table align=center>
  <tr>
    <td>
      <img src="https://partywonguham.s3.ap-northeast-2.amazonaws.com/readme_create_time_1.gif" alt="Create time 1"/>
    </td>
    <td>
      <img src="https://partywonguham.s3.ap-northeast-2.amazonaws.com/readme_create_time_2.gif" alt="Create time 2"/>
    </td>
  </tr>
  <tr>
    <td>
      <p align=center>약속 페이지 생성</p>
    </td>
    <td>
      <p align=center>타임라인에 시간 추가</p>
    </td>
  </tr>
</table>

&nbsp;

### 📧 알림 발송

> 설정한 인원수가 모두 채워지면 알림 수신에 동의한 사람에 한해서 이메일로 알림을 발송합니다.

<table align=center>
  <tr>
    <td>
      <img src="https://partywonguham.s3.ap-northeast-2.amazonaws.com/readme_send_email_1.gif" alt="Send email 1"/>
    </td>
    <td>
      <img src="https://partywonguham.s3.ap-northeast-2.amazonaws.com/readme_send_email_2.gif" alt="Send email 2"/>
    </td>
  </tr>
  <tr>
    <td>
      <p align=center>설정한 인원수가 모두 채워짐</p>
    </td>
    <td>
      <p align=center>이메일에 알림 발송</p>
    </td>
  </tr>
</table>

&nbsp;

## 아키텍쳐

### 🧬 Serverless framework

> Nuxt.js와 Nuxt.js에서 기본 제공하는 SSR 기능을 사용해 별도의 서버를 두지 않고 운영하고 있습니다. 따라서 사용하는 인원이 한 동안 없었던 경우 부팅하는데 몇초의 시간이 걸릴 수 있습니다.

### 🛢 Database

> 데이터베이스는 Firebase의 Cloud Firestore를 사용하고 있고, Firebase에서 기본 제공하는 `firebase admin sdk`를 사용해서 데이터베이스에 접근하고 있습니다.

&nbsp;

## 기술 스택

<table>
  <thead>
    <tr>
      <th>category</th>
      <th>stacks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p align=center>Common</p>
      </td>
      <td>
        <img src="https://img.shields.io/badge/node-3C873A?logo=node.js&logoColor=ffffff" alt="Node badge"/>
        <img src="https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=ffffff" alt="NPM badge"/>
        <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000000" alt="JavaScript badge"/>
        <img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=ffffff" alt="TypeScript badge"/>
      </td>
    </tr>
    <tr>
      <td>
        <p align=center>Frontend</p>
      </td>
      <td>
        <img src="https://img.shields.io/badge/Nuxt.js-00DC82?logo=nuxt.js&logoColor=000000" alt="Next.js badge"/>
        <img src="https://img.shields.io/badge/Vue.js-4FC08D?logo=vue.js&logoColor=000000" alt="MUI badge"/>
        <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=ffffff" alt="Framer badge"/>
        <img src="https://img.shields.io/badge/Tailwind%20CSS-38BDF8?logo=tailwindcss&logoColor=ffffff" alt="Tailwind CSS badge"/>
        <img src="https://img.shields.io/badge/Swiper-6332F6?logo=swiper&logoColor=ffffff" alt="Tailwind CSS badge"/>
      </td>
    </tr>
    <tr>
      <td>
        <p align=center>Backend</p>
      </td>
      <td>
        <img src="https://img.shields.io/badge/Firestore-4487FA?logo=data:image/svg%2bxml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQoNCjxkZWZzPg0KDQo8c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZmZmZjt9LmNscy0ye2ZpbGw6I2ZmZmZmZjt9LmNscy0ze2ZpbGw6I2ZmZmZmZjt9PC9zdHlsZT4NCg0KPC9kZWZzPg0KDQo8dGl0bGU+SWNvbl8yNHB4X0ZpcmVzdG9yZV9Db2xvcjwvdGl0bGU+DQoNCjxnIGRhdGEtbmFtZT0iUHJvZHVjdCBJY29ucyI+DQoNCjxnIGRhdGEtbmFtZT0iY29sb3JlZC0zMi9maXJlc3RvcmUiPg0KDQo8ZyA+DQoNCjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTIxLDEzLDEyLDl2NGw5LDRabTAtN0wxMiwyVjZsOSw0WiIvPg0KDQo8cG9seWdvbiBpZD0iUmVjdGFuZ2xlLTciIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIzIDYgMTIgMiAxMiA2IDMgMTAgMyA2Ii8+DQoNCjxwb2x5Z29uIGlkPSJSZWN0YW5nbGUtNy0yIiBkYXRhLW5hbWU9IlJlY3RhbmdsZS03IiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMyAxMyAxMiA5IDEyIDEzIDMgMTcgMyAxMyIvPg0KDQo8cG9seWdvbiBpZD0iUmVjdGFuZ2xlLTctMyIgZGF0YS1uYW1lPSJSZWN0YW5nbGUtNyIgY2xhc3M9ImNscy0zIiBwb2ludHM9IjEyIDE4IDE1LjM3IDE2LjUgMTkuODggMTguNSAxMiAyMiAxMiAxOCIvPg0KDQo8L2c+DQoNCjwvZz4NCg0KPC9nPg0KDQo8L3N2Zz4=" alt="MySQL badge"/>
        <img src="https://img.shields.io/badge/NoSQL-C925D1?logo=amazondocumentdb&logoColor=ffffff" alt="MySQL badge"/>
      </td>
    </tr>
    <tr>
      <td>
        <p align=center>Deployment</p>
      </td>
      <td>
        <img src="https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=ffffff" alt="Vercel badge"/>
        <img src="https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=000000" alt="MySQL badge"/>
      </td>
    </tr>
    <tr>
      <td>
        <p align=center>CI/CD</p>
      </td>
      <td>
        <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=github-actions&logoColor=ffffff" alt="Github Actions badge"/>
        <img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?logo=visualstudiocode&logoColor=ffffff" alt="Visual Studio Code badge"/>
      </td>
    </tr>
  </tbody>
</table>

&nbsp;

## 팀원

<table>
  <tbody>
    <tr>
        <td valign="top" width="33.33%">
            <img src="https://avatars.githubusercontent.com/u/107545098?v=4" width="128px;" alt="taedonn"/><br/>
            <a href="https://github.com/taedonn">
                <sub><b>taedonn</b></sub>
            </a><br/>
            <a href="https://github.com/taedonn/partywonguham/commits?author=taedonn" title="Commits">
                <sub>commits</sub>
            </a> <sub>·</sub> 
            <a href="https://github.com/taedonn/partywonguham/pulls?q=taedonn" title="Pull Requests">
                <sub>pull requests</sub>
            </a>
        </td>
        <td valign="top" width="33.33%">
            <img src="https://avatars.githubusercontent.com/u/96365042?v=4" width="128px;" alt="g1azed"/><br/>
            <a href="https://github.com/g1azed">
                <sub><b>g1azed</b></sub>
            </a><br/>
            <a href="https://github.com/g1azed/partywonguham/commits?author=g1azed" title="Commits">
                <sub>commits</sub>
            </a> <sub>·</sub> 
            <a href="https://github.com/g1azed/partywonguham/pulls?q=g1azed" title="Pull Requests">
                <sub>pull requests</sub>
            </a>
        </td>
        <td valign="top" width="33.33%">
            <img src="https://avatars.githubusercontent.com/u/88708708?v=4" width="128px;" alt="hanjuda"/><br/>
            <a href="https://github.com/hanjuda">
                <sub><b>hanjuda</b></sub>
            </a><br/>
            <a href="https://github.com/hanjuda/partywonguham/commits?author=hanjuda" title="Commits">
                <sub>commits</sub>
            </a> <sub>·</sub> 
            <a href="https://github.com/hanjuda/partywonguham/pulls?q=hanjuda" title="Pull Requests">
                <sub>pull requests</sub>
            </a>
        </td>
    </tr>
  </tbody>
</table>

&nbsp;

## 라이센스

MIT License © 2023-PRESENT 태돈, 파티원구함
