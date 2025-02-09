<template>
  <v-dialog max-width="700">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" block color="primary" class="mt-7">
        {{ $t("operations.rate") }}
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card rounded="lg">
        <v-card-title class="d-flex align-center">
          <h3>{{ $t("operations.rate") }}</h3>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" @click="isActive.value = false"></v-btn>
        </v-card-title>
        <v-card-text>
          <h4>{{ $t("operations.rate_desc") }}</h4>
          <v-form ref="formRef">
            <v-rating
              hover
              :length="5"
              :size="32"
              v-model="rate.rating"
              active-color="yellow-accent-4"
            />

            <v-textarea
              :rules="[rules.required]"
              v-model="rate.feedback_text"
              :label="$t('operations.feedback_care')"
            ></v-textarea>
          </v-form>
        </v-card-text>

        <div class="d-flex pa-5">
          <v-spacer></v-spacer>

          <v-btn
            @click="submit(isActive)"
            :loading="btnLoading"
            :disabled="btnLoading"
            color="primary"
            min-width="120"
          >
            {{ $t("buttons.send") }}
          </v-btn>
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
const { formRef, rules, validate } = useFormValidation();

const props = defineProps({
  id: Number,
});

const { sendFeedback } = useMaintainStore();
const rate = ref({
  rating: 1,
  feedback_text: "",
});

const btnLoading = ref(false);

const submit = async (dailog) => {
  try {
    btnLoading.value = true;
    await validate();
    await sendFeedback(props.id, rate.value);
    dailog.value = false;
  } finally {
    btnLoading.value = false;
    rate.value = { rating: 1, feedback_text: "" };
  }
};
</script>
