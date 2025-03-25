<script setup>
const { getSingleOrder, setPayMethod } = useMaintainStore();
const { confirmCash, confirmOnline } = useTechnicianStore();
const { t, locale } = useI18n();
const { formatToDateString } = useDateTimeFormate(locale.value);
const showModal = ref(false);
const submitLoading = ref(false);
const confirmCashLoading = ref(false);
const confirmCashModal = ref(false);
const cashNote = ref("");
const order = ref(null);
const showOnlineModal = ref(false);

const { data, error, refresh } = await getSingleOrder(useRoute().params.id);
order.value = data.value.data;
const isTechnician = useCookie("isTechnician");

const submitPayMethod = async (method) => {
  try {
    submitLoading.value = true;
    await setPayMethod(useRoute().params.id, "cash");
    showModal.value = false;
  } catch (error) {
    throw error;
  } finally {
    submitLoading.value = true;
    showModal.value = false;
  }
};

const confirmCashPay = async () => {
  if ("geolocation" in navigator) {
    confirmCashLoading.value = true;
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        await confirmCash(useRoute().params.id, {
          lat,
          long,
          notes: cashNote.value,
        });
        confirmCashLoading.value = false;
        confirmCashModal.value = false;
        refresh();
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  } else {
    alrt("Geolocation is not supported by this browser.");
  }
};

const onlinePayLoading = ref(false);
const confirmOnlinePay = async () => {
  onlinePayLoading.value = true;
  const { data, status } = await confirmOnline(useRoute().params.id);
  onlinePayLoading.value = false;
  if (status.value === "success") {
    showOnlineModal.value = false;
    window.location.href = data.value.payment_url;
  }
};
</script>

<template>
  <div>
    <v-card v-if="!error && order" flat rounded="xl" class="border bill-view">
      <v-card-text>
        <h2 class="">{{ t("operations.view_bill") }}</h2>
        <v-card class="mt-4" rounded="lg" elevation="2">
          <v-card-text>
            <div class="d-flex justify-center align-center ga-2">
              <AppSvgIcon name="logo" size="lg" />
              <AppSvgIcon name="title" :size="60" />
            </div>

            <!-- details -->
            <div class="mt-10 bill-details">
              <div class="item" v-if="order.invoice_number">
                <div class="label">{{ t("operations.bill_number") }}</div>
                <div class="value">{{ order.invoice_number }}</div>
              </div>
              <div class="item">
                <div class="label">{{ t("operations.client_name") }}</div>
                <div class="value">
                  {{
                    order.customer.first_name + " " + order.customer.last_name
                  }}
                </div>
              </div>
              <div class="item">
                <div class="label">{{ t("operations.order_type") }}</div>
                <div class="value">
                  {{ t("operations." + order.type) }}
                </div>
              </div>
              <div class="item">
                <div class="label">{{ t("operations.device") }}</div>
                <div class="value">{{ order.products[0].name }}</div>
              </div>
              <div class="item">
                <div class="label">{{ t("operations.location") }}:</div>
                <div class="value">
                  {{ order.address.name }}, {{ order.address?.street }} ,{{
                    order.address?.national_address
                  }}
                </div>
              </div>
              <div class="item">
                <div class="label">{{ t("operations.day") }}</div>
                <div class="value">
                  {{ formatToDateString(order.slot.date) }}
                </div>
              </div>
              <div class="item">
                <div class="label">{{ t("operations.time") }}:</div>
                <div class="value">
                  {{ order.slot.time }}
                </div>
              </div>
            </div>

            <!-- table details -->
            <div class="table">
              <div class="row">
                <div class="cell">العنصر</div>
                <div class="cell">السعر</div>
                <div class="cell">الكمية</div>
                <div class="cell">المحموع</div>
              </div>
              <div class="row" v-for="item in order.invoice.services">
                <div class="cell">{{ item.name }}</div>
                <div class="cell">{{ item.price }} ر.س</div>
                <div class="cell">1</div>
                <div class="cell">{{ item.price }} ر.س</div>
              </div>
              <div class="row" v-for="item in order.invoice.spare_parts">
                <div class="cell">{{ item.name }}</div>
                <div class="cell">{{ item.price }} ر.س</div>
                <div class="cell">{{ item.pivot.quantity }}</div>
                <div class="cell">
                  {{ item.price * item.pivot.quantity }} ر.س
                </div>
              </div>
            </div>

            <!-- payment details -->
            <div>
              <div class="d-flex align-center justify-space-between mb-2">
                <h5>{{ t("operations.payment_method") }}</h5>
                <h5>
                  {{
                    order.invoice.payment_method
                      ? order.invoice.payment_method
                      : t(`operations.pay_method_not_set`)
                  }}
                </h5>
              </div>
              <div class="d-flex align-center justify-space-between mb-2">
                <h5>{{ t("operations.payment_status") }}</h5>
                <h5 class="text-warning">
                  {{ $t(`operations.${order.current_status?.status}`) }}
                </h5>
              </div>
              <div class="d-flex align-center justify-space-between">
                <h4 class="font-weight-medium">{{ t("operations.total") }}</h4>
                <h4 class="font-weight-medium">
                  {{ order.invoice.total }} ر.س
                </h4>
              </div>
            </div>

            <div
              v-if="!isTechnician && order.current_status.status != 'completed'"
              class="d-flex ga-2 mt-5"
            >
              <v-btn
                @click="showModal = true"
                color="primary"
                class="flex-grow-1 text-14"
              >
                <AppSvgIcon name="wallet" />
                {{ t("operations.cash") }}
              </v-btn>

              <v-btn
                @click="showOnlineModal = true"
                color="pri-light"
                class="text-primary flex-grow-1 text-14"
              >
                <AppSvgIcon name="card-pos" />
                {{ t("operations.oniline_pay") }}
              </v-btn>
            </div>
            <v-btn
              v-if="
                isTechnician &&
                order.invoice.payment_method == 'cash' &&
                order.current_status.status != 'completed'
              "
              color="primary"
              block
              class="mt-5 text-14"
              @click="confirmCashModal = true"
            >
              <AppSvgIcon name="wallet" />
              {{ t("operations.confirm_money") }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
    <app-modal
      :title="$t('operations.pay_cash')"
      :text="$t('operations.pay_cash_desc')"
      icon="money-tick"
      v-model:dialog="showModal"
      :isLoading="submitLoading"
      @submit="submitPayMethod"
    ></app-modal>

    <app-modal
      :title="$t('operations.pay_online')"
      :text="$t('operations.are_you_sure_pay_online')"
      icon="money-tick"
      v-model:dialog="showOnlineModal"
      :isLoading="onlinePayLoading"
      @submit="confirmOnlinePay"
    ></app-modal>

    <app-modal
      :title="$t('operations.confirm_pay_cash')"
      :text="$t('operations.confirm_pay_cash_desc')"
      icon="money-tick"
      v-model:dialog="confirmCashModal"
      :isLoading="confirmCashLoading"
      @submit="confirmCashPay"
    >
      <v-textarea
        v-model="cashNote"
        :placeholder="$t('operations.note')"
      ></v-textarea>
    </app-modal>
  </div>
</template>

<style lang="scss" scoped>
.bill-view {
  .bill-details {
    .item {
      display: flex;
      margin-bottom: 10px;
      gap: 10px;
      font-size: 12px;
      .value {
        font-weight: 500;
      }
    }
  }
  .table {
    display: table;
    width: 100%;
    font-size: 10px;
    font-weight: 500;
    border-top: 2px dashed #959595;
    border-bottom: 2px dashed #959595;
    margin: 20px 0;
    .row {
      display: table-row;
      &:first-of-type {
        font-weight: 400;
      }
      .cell {
        display: table-cell;
        text-align: center;
        &:first-of-type {
          text-align: start;
        }
        &:last-of-type {
          text-align: end;
        }
      }
    }

    .row,
    .cell {
      padding: 10px;
    }
  }
}
</style>
