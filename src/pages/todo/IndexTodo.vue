<template>
  <div>
    <h1 class="text-h5">List Todo</h1>
    <q-separator />
  </div>
  <div class="q-mt-sm" style="display: flex; flex-direction: column; gap: 10px">
    <q-select
      filled
      v-model="modelYear"
      :options="listYear"
      label="Year"
      map-options
    />
    <q-select
      filled
      v-model="modelMonth"
      :options="listMonth"
      option-value="num"
      option-label="name"
      label="Month"
      map-options
    />
  </div>
  <div class="q-mt-sm">
    <swiper :slides-per-view="2" :space-between="50">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { format, lastDayOfMonth } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    //VARIABLE
    const listMonth = generateListMonth();
    const listYear = [
      '2021',
      '2022',
      '2023',
      '2024',
      '2025',
      '2026',
      '2027',
      '2028',
      '2029',
      '2030',
    ];
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
    const currentYear = new Date().getFullYear();

    //MODEL
    let modelMonth = ref(currentMonth);
    let modelYear = ref(currentYear.toString());
    let modelCarousel = ref(1);

    const listDate = generateListDate(
      Number(modelYear.value),
      modelMonth.value
    );

    //FUNCTION
    function generateListMonth() {
      const listMonth = [];
      const currentYear = new Date().getFullYear();
      for (let i = 1; i <= 12; i++) {
        let nameMonth = format(new Date(currentYear, i - 1, 1), 'MMMM');
        listMonth.push({
          num: String(i).padStart(2, '0'),
          name: nameMonth,
        });
      }

      return listMonth;
    }

    function generateListDate(year: number, month: string) {
      const lastDate = format(
        lastDayOfMonth(new Date(year, Number(month) - 1, 1)),
        'dd'
      );

      const list = [];

      for (let i = 1; i <= Number(lastDate); i++) {
        let stringDate = `${year}-${month}-${String(i).padStart(2, '0')}`;
        let formatted = format(new Date(stringDate), 'dd-MM-yyyy');
        let nameDay = format(new Date(stringDate), 'EEEE');

        list.push({
          date: formatted,
          nameDay,
        });
      }

      return list;
    }

    return {
      modelMonth,
      modelYear,
      modelCarousel,
      listMonth,
      listYear,
      listDate,
    };
  },
};
</script>
