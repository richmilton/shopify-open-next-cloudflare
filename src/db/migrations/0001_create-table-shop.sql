-- Migration number: 0003 	 2026-05-08T11:18:15.268Z
create table "Shop" (
    "id" integer primary key autoincrement,
    "shopifyName" text not null,
    "shopifyAccessToken" text not null,
    "supplyMeSubscriber" boolean not null default false,
    "shopifyId" text not null,
    "currencyCode" text
);
