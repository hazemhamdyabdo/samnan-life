import type {
  TechnicianResponse,
  Product,
  District,
  AllRequestsResponse,
  MaintenanceRequest,
  InvoiceInterface,
} from "@/types/technician";
export const useTechnicianStore = defineStore(
  "technician",
  (): {
    chartDataAllRequests: Ref<Record<string, any>>;
    chartDataCompletedRequests: Ref<Record<string, any>>;
    coverDistricts: Ref<District[] | undefined>;
    technicianProducts: Ref<Product[] | undefined>;
    getTechnicianData: () => Promise<void>;
    getTechnicianAllRequests: () => Promise<void>;
    invoiceInterface: Ref<InvoiceInterface[] | undefined>;
    selectedInvoiceId: Ref<number | undefined>;
    currentInvoiceDetails: ComputedRef<any>;
    onMyWay: (id: number) => Promise<unknown>;
    inProgress: (id: number) => Promise<unknown>;
  } => {
    const chartDataAllRequests = ref({});
    const chartDataCompletedRequests = ref({});
    const coverDistricts = ref<District[]>();
    const technicianProducts = ref<Product[]>();

    const getTechnicianData = async () => {
      const { data } = await useAPI<TechnicianResponse>(
        `/technician/requests-summary`
      );
      technicianProducts.value = data.value?.data.technician.products;
      coverDistricts.value = data.value?.data.technician.districts;
      chartDataAllRequests.value = {
        allRequests: data.value?.data.total_requests,
        typeOfRequests: data.value?.data.requests_by_type,
      };
      chartDataCompletedRequests.value = {
        completedRequests: data.value?.data.completed_requests,
        ongoingRequests: data.value?.data.ongoing_requests,
        allRequests: data.value?.data.total_requests,
      };
    };

    const onMyWay = (id: number) => {
      return useAPI(`maintenance-request/${id}/set-on-the-way`, {
        method: "POST",
      });
    };

    const inProgress = (id: number) => {
      return useAPI(`maintenance-request/${id}/set-in-progress`, {
        method: "POST",
        body: {
          lat: 0,
          long: 0,
        },
      });
    };

    const invoiceInterface = ref<InvoiceInterface[]>();
    const invoices = ref();
    const selectedInvoiceId = ref<number>();
    const currentInvoiceDetails = computed(() => {
      const currentInvoice: MaintenanceRequest = invoices.value?.find(
        (invoice: MaintenanceRequest) => invoice.id === selectedInvoiceId.value
      );
      return {
        id: currentInvoice?.id,
        invoice_number: currentInvoice?.invoice_number,
        customerName: currentInvoice?.customer,
        type: currentInvoice?.type,
        productName: currentInvoice?.products[0].name,
        address: currentInvoice?.address,
        time: currentInvoice?.slot?.time,
        date: currentInvoice?.slot?.date,
        status: currentInvoice?.invoice?.status,
        payment_method: currentInvoice?.invoice?.payment_method,
        total: currentInvoice?.invoice?.total,
        service: currentInvoice?.invoice?.services.map((service) => ({
          name: service.name,
          price: service.price,
          quantity: 1,
        })),
      };
    });

    const getTechnicianAllRequests = async () => {
      const { data } = await useAPI<AllRequestsResponse>(
        `/technician/requests`
      );
      invoiceInterface.value = data.value?.data.data.map((request) => {
        return {
          id: request.id,
          customerName: request.customer,
          invoice_number: request.invoice_number,
          productName: request.products[0].name,
          type: request.type,
          address: request?.address,
          time: request?.slot?.time,
          date: request?.slot?.date,
          status: request?.invoice?.status,
          service: request?.invoice?.services.map((service) => ({
            name: service.name,
            price: service.price,
            quantity: 1,
          })),
          payment_method: request.invoice?.payment_method,
          total: request.invoice?.total,
        };
      });
      invoices.value = data.value?.data.data;
    };

    return {
      chartDataAllRequests,
      chartDataCompletedRequests,
      coverDistricts,
      technicianProducts,
      getTechnicianData,
      getTechnicianAllRequests,
      invoiceInterface,
      selectedInvoiceId,
      currentInvoiceDetails,
      onMyWay,
      inProgress,
    };
  }
);
