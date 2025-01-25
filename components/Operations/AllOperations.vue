<script setup>
const { formatToDateString } = useDateTimeFormate("ar");
const getStatus = useStatus();
const props = defineProps(["operations"]);
const panel = ref();
const cancelLoading = ref(false);
const { cancelOrder } = useMaintainStore();
const showModal = ref(false);
const id = ref(null);
const cancel = async () => {
  try {
    cancelLoading.value = true;
    await cancelOrder(id.value);
  } catch (error) {
    throw error;
  } finally {
    showModal.value = false;
    cancelLoading.value = false;
  }
};
</script>

<template>
  <div>
    <app-modal
      :title="$t('operations.cancel_order')"
      :text="$t('operations.cancel_order_desc')"
      icon="box-remove"
      v-model:model-value="showModal"
      isDelete
      :is-loading="cancelLoading"
      @submit="cancel"
    ></app-modal>

    <div class="d-flex align-center ga-2">
      <h2>
        {{ $t("operations.all_operations") }}
      </h2>
      <!-- <v-spacer></v-spacer>
      <v-text-field
        bg-color="disabled-gray"
        density="compact"
        flat
        variant="solo"
        :placeholder="$t('operations.search')"
        height="42px"
        hide-details
      >
      </v-text-field>
      <v-btn color="primary" height="42" size="small" rounded="lg">
        <AppSvgIcon name="filter" />
      </v-btn> -->
    </div>
    <v-expansion-panels v-model="panel" class="mt-5">
      <v-row>
        <v-col cols="12" v-for="item in operations" :key="item.id">
          <v-expansion-panel class="border radius-16" elevation="0">
            <v-expansion-panel-title>
              <div class="d-flex align-center ga-2">
                <v-avatar
                  v-if="item?.products?.length"
                  size="48"
                  color="primary"
                >
                  <v-img :src="item?.products[0]?.image_url"></v-img>
                </v-avatar>
                <div>
                  <h3>{{ $t("operations." + item.type) }}</h3>
                  <p v-if="item.slot" class="text-12 mt-2 text-caption date">
                    {{
                      formatToDateString(item.slot.date) + " " + item.slot.time
                    }}
                  </p>
                </div>
              </div>
              <v-spacer></v-spacer>
              <v-chip :color="getStatus(item.current_status?.status)"
                >{{ "\u2022" }}
                {{ $t(`operations.${item.current_status?.status}`) }}
              </v-chip>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <!-- Details -->
              <h5>{{ $t("operations.devices_to_maintain") }}</h5>
              <div
                v-for="product in item.products"
                :key="product.id"
                class="d-flex mt-3 ga-2"
              >
                <v-avatar size="22" color="primary">
                  <v-img :src="product.image_url"></v-img>
                </v-avatar>
                <h5 class="text-gray-500">{{ product.name }}</h5>
              </div>

              <!-- track -->
              <div class="d-flex mt-7 align-center">
                <h5>{{ $t("operations.location") }}</h5>
                <v-spacer></v-spacer>
                <nuxt-link
                  :to="
                    localePath('/dashboard/operations/track-order/' + item.id)
                  "
                  class="text-primary align-center text-12 d-flex ga-3"
                >
                  <AppSvgIcon name="map" />
                  <span>{{ $t("operations.track") }}</span>
                </nuxt-link>
              </div>

              <!-- location -->
              <div class="d-flex align-center ga-2">
                <AppSvgIcon name="location-blue" />
                <div>
                  <h5 class="text-gray-500">
                    {{ item.address?.national_address }}
                  </h5>
                  <p class="text-12 mt-2 text-caption date">
                    {{ item.address.name }}, {{ item.address?.street }}
                  </p>
                </div>
              </div>

              <!-- description -->
              <div v-if="item.problem_description" class="mt-7">
                <h5>{{ $t("operations.problem") }}</h5>
                <p class="text-12 text-gray-500">
                  {{ item.problem_description }}
                </p>
              </div>

              <div
                class="d-flex mt-2 align-center ga-2 flex-wrap"
                v-if="item?.photos?.length"
              >
                <v-img
                  color="primary"
                  height="60px"
                  width="100%"
                  max-width="60px"
                  class="rounded-16"
                  v-for="img in item?.photos"
                  :key="img"
                  :src="img"
                ></v-img>
              </div>
              <!-- maintain date -->
              <div class="mt-7" v-if="item?.slot">
                <h5 class="mb-3">{{ $t("operations.maintain_date") }}</h5>
                <div class="d-flex align-center ga-3">
                  <AppSvgIcon name="calendar" />
                  <h5>{{ formatToDateString(item?.slot?.date) }}</h5>
                </div>
                <div class="d-flex align-center ga-3 mt-2">
                  <AppSvgIcon name="clock" />
                  <h5>{{ item?.slot?.time }}</h5>
                </div>
              </div>

              <!-- maintainer details -->
              <div class="mt-7">
                <h5 class="mb-3">{{ $t("operations.maintainer") }}</h5>
                <div class="d-flex align-center ga-3">
                  <AppSvgIcon name="user" />
                  <h5>
                    {{ item?.technician?.first_name }}
                    {{ item?.technician?.last_name }}
                  </h5>
                </div>
                <div class="d-flex align-center ga-3 mt-2">
                  <AppSvgIcon name="call" />
                  <h5>{{ item?.technician?.phone }}</h5>
                </div>
              </div>

              <v-btn
                @click="
                  showModal = true;
                  id = item.id;
                "
                variant="text"
                color="error"
                class="mt-7"
              >
                <v-icon>mdi-delete-outline</v-icon>
                {{ $t("operations.cancel_order") }}
              </v-btn>

              <!-- payment details -->
              <v-divider class="mt-7"></v-divider>
              <div class="mt-7">
                <div class="d-flex align-center">
                  <h5 class="text-14">
                    {{ $t("operations.payment_details") }}
                  </h5>
                  <v-spacer></v-spacer>
                  <nuxt-link
                    class="text-primary text-12 d-flex align-center ga-3"
                    :to="localePath('/dashboard/operations/view-bill')"
                  >
                    <AppSvgIcon name="document-normal" />
                    <span>{{ $t("operations.view_bill") }}</span>
                  </nuxt-link>
                </div>

                <div class="d-flex align-center ga-3 mt-2">
                  <h5 class="text-14">
                    {{ $t("operations.total") }}
                  </h5>
                  <v-spacer></v-spacer>
                  <h5 class="text-14">162.00 ر.س</h5>
                </div>
              </div>

              <!-- review -->
              <v-divider class="mt-7"></v-divider>
              <div class="mt-7">
                <div class="d-flex align-center ga-2">
                  <h5>Ahmed Ali</h5>
                  <span class="d-flex align-center text-14">
                    5.0
                    <v-icon color="#FFD33C">mdi-star</v-icon>
                  </span>
                </div>
                <h5>خدمة ممتازة و سرعة استجابة, تجربة رائعة شكرا لكم</h5>
                <div class="date text-12">10 Oct 2024, 10:32 PM</div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-col>
      </v-row>
    </v-expansion-panels>
  </div>
</template>

<style>
.date {
  color: #959595;
}
</style>
