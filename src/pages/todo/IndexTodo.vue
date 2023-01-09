<template>
  <TodoWrapper>
    <template #content>
      <div>
        <h1 class="text-h5">List Todo</h1>
        <q-separator />
      </div>
      <div
        class="q-mt-sm"
        style="display: flex; flex-direction: column; gap: 10px"
      >
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
        <swiper
          :initial-slide="indexCurrentDate"
          :slides-per-view="$q.screen.md || $q.screen.gt.md ? 10 : 3"
          style="padding-top: 10px; padding-bottom: 10px; padding-left: 10px"
          :space-between="10"
        >
          <swiper-slide v-for="date in listDate" :key="date.date">
            <q-card
              :class="{
                'bg-red-7 text-white': date.date === currentDate,
              }"
            >
              <q-card-section class="text-center">
                <h3 class="text-h6">
                  {{ date.day }}
                </h3>
                <p class="text-subtitle1">{{ date.nameDay }}</p>
              </q-card-section>
            </q-card>
          </swiper-slide>
        </swiper>
      </div>

      <div class="q-mt-sm">
        <q-list bordered class="rounded-borders">
          <q-expansion-item label="Daily Routine" style="font-weight: 500">
            <q-list style="font-weight: normal">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-checkbox v-bind:model-value="false" />
                </q-item-section>

                <q-item-section>Laundry</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-checkbox v-bind:model-value="false" />
                </q-item-section>

                <q-item-section>Laundry</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-checkbox v-bind:model-value="false" />
                </q-item-section>

                <q-item-section>Laundry</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
          <q-separator />
          <q-expansion-item label="Additional" style="font-weight: 500">
            <q-list style="font-weight: normal">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-checkbox v-bind:model-value="false" />
                </q-item-section>

                <q-item-section>Laundry</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-checkbox v-bind:model-value="false" />
                </q-item-section>

                <q-item-section>Laundry</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-checkbox v-bind:model-value="false" />
                </q-item-section>

                <q-item-section>Laundry</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
        </q-list>
      </div>
    </template>

    <template #footer>
      <q-space />
      <q-btn
        @click="openCreate"
        size="lg"
        color="red-7"
        round
        style="border: 10px solid white; margin-top: -40px"
        icon="add"
      />
      <q-space />
      <q-btn color="white" flat icon="notifications" />
    </template>
  </TodoWrapper>
</template>

<script lang="ts">
import TodoWrapper from 'src/layouts/TodoWrapper.vue';
import { ref, watch } from 'vue';
import { format, lastDayOfMonth } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import 'swiper/css';
export default {
  components: {
    Swiper,
    SwiperSlide,
    TodoWrapper,
  },
  setup() {
    //VARIABLE
    const router = useRouter();
    const $q = useQuasar();
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
    const currentDate = format(new Date(), 'dd-MM-yyyy');

    //MODEL
    let modelMonth = ref(currentMonth);
    let modelYear = ref(currentYear.toString());
    let modelCarousel = ref(1);

    let listDate = ref(
      generateListDate(Number(modelYear.value), modelMonth.value)
    );
    let indexCurrentDate = getIndexDate(currentDate);

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
          day: i,
          date: formatted,
          nameDay,
        });
      }

      return list;
    }

    function getIndexDate(date: string) {
      let index = listDate.value.findIndex((item) => item.date === date);
      let finalIndex = Math.ceil(index / 3);
      return finalIndex < 0 ? 0 : finalIndex + 1;
    }

    function openCreate() {
      router.push('/todo/create');
    }

    //WATCH
    watch(modelMonth, (value: any) => {
      listDate.value = generateListDate(Number(modelYear.value), value.num);
      indexCurrentDate = getIndexDate(currentDate);
    });

    watch(modelYear, (value) => {
      listDate.value = generateListDate(Number(value), modelMonth.value);
      indexCurrentDate = getIndexDate(currentDate);
    });

    return {
      modelMonth,
      modelYear,
      modelCarousel,
      listMonth,
      listYear,
      listDate,
      currentDate,
      indexCurrentDate,
      $q,
      openCreate,
    };
  },
};
</script>
