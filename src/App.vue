<script setup lang="ts">
import { ref, computed } from "vue";

const wPrice = ref<number>(1000);
const years = ref<number>(30);
const rateYear = ref<number>(2);
const gracePeriod = ref<number>(2);

const price = computed<number>(() => wPrice.value * 10000);
const monthlyRate = computed<number>(() => rateYear.value / 100 / 12);
const months = computed<number>(() => years.value * 12);
const graceMonths = computed<number>(() => gracePeriod.value * 12);
const repayMonths = computed<number>(() => months.value - graceMonths.value);
const gracePeriodMonth = computed<number>(
  () => price.value * monthlyRate.value
);

const payMonth = computed<number>(() => {
  if (monthlyRate.value === 0) {
    return price.value / repayMonths.value;
  }
  const r = monthlyRate.value;
  const n = repayMonths.value;
  const P = price.value;
  return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
});

const total = computed<number>(() => {
  if (!gracePeriod.value) {
    return payMonth.value * months.value;
  }
  return (
    gracePeriodMonth.value * graceMonths.value +
    payMonth.value * repayMonths.value
  );
});

const interest = computed<number>(() => total.value - price.value);
const loanMonth = computed<number>(() => price.value / repayMonths.value);
const interestMonth = computed<number>(
  () => interest.value / repayMonths.value
);

const formatNumber = (num: number): string => {
  return Math.round(num).toLocaleString();
};
</script>

<template lang="pug">
  header.header-main
    h1 Mortgage
      span 房貸試算
  form.form-main
    ul
      li
        label 貸款金額 (萬)
        input(v-model.number="wPrice" type="number" step="5" min="0")
      li
        label 貸款期限 (年)
        input(v-model.number="years" type="number" step="5" min="0")
      li
        label 貸款年利率 (%)
        input(v-model.number="rateYear" type="number" step=".1" min="0")
      li
        label 寬限期 (年)
        input(v-model.number="gracePeriod" type="number" step="1" min="0")
  section.result
    h2 計算結果
    ul
      li(v-if="gracePeriod")
        label 寬限期月還款 ( {{ gracePeriod }} 年)
        h4 {{ formatNumber(gracePeriodMonth) }}
        p 前 {{gracePeriod}} 年只還利息
      li
        label 月還款 ( {{ years - gracePeriod }} 年)
        h4 {{ formatNumber(payMonth) }}
        p(v-if="!gracePeriod") {{ formatNumber(loanMonth) }} + {{ formatNumber(interestMonth) }} 元
        p(v-else) 後 {{ years - gracePeriod }} 年本息平均攤還
      li
        label 貸款本金
        h4 {{ formatNumber(price) }}
        p 平均每月還 {{ formatNumber(loanMonth) }} 元
      li
        label 利息
        h4 {{ formatNumber(interest) }}
        p 平均每月還 {{ formatNumber(interestMonth) }} 元
      li
        label 貸款總付
        h4 {{ formatNumber(total) }}
  section.info
    p.text-sm 提醒：買房子還有一些可能的額外費用，如下所列，除了頭期款，還要準備另一筆資金。
    table
      thead
        tr
          th 項目
          th 費用
      tbody
        tr
          td 契稅
          td 房屋現值 X 6%。一般約 2 - 6 萬元，越貴的房子越高。
        tr
          td 印花稅
          td (房屋現值 + 土地現值) / 1000
        tr
          td 地政規費登記費
          td (房屋現值 + 地價) / 1000
        tr
          td 貸款開通設定費
          td 可能 1 千多到數千元不等
        tr
          td 貸款強制火災地震險
          td 每年約 2 千多元
        tr
          td 房屋稅、地價稅
          td 依買賣日期，雙方各自負擔比例。
        tr
          td 代書費
          td 約 1 萬多元。
        tr
          td 履約保證費用
          td
            | 房屋總價 * 6 / 10000，雙方各付一半。 
            br
            | 例如 1000 萬的房子，費用是 6000 元，各付 3000 元。
        tr
          td 外管線費用
          td 有些新建案會收取天然瓦斯外管線費用，可能是數萬元的金額，購買前要詢問清楚。
        tr
          td 代管管理費
          td 有些新建案會先收取 3 - 6 個月管理費，有些會主打幾年內免付管理費，購買前要詢問清楚。
        tr
          td 仲介費 (中古屋)
          td 約為成交價的 1 - 2 %。
        tr
          td 搬家費
          td 一台車一趟大約幾千元，沒電梯或偏鄉會加價。
        tr
          td 裝潢與家電家具費
          td 通常約數十萬至百萬以上。
        tr
          td 生活預備金
          td 飲食費、近期要繳的所得稅、汽車稅、保險費、小孩的學費等等。
  footer.footer-main
    address
      a(href="https://chiayilai.github.io/resume/" target="_blank") Powered by Chia Yi Lai
</template>

<style scoped></style>
