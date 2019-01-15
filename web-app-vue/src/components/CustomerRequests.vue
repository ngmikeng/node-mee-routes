<template>
  <div class="customer-requests-component">
    <h1>Customer Requests</h1>
    <div class="g-margin-bot-10">
      <a-button type="primary" @click="openModal">Add a Request</a-button>
    </div>
    <a-table :columns="columns"
      :rowKey="record => { return record.id }"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="operation" slot-scope="text, record">
        <a-button type="default" @click="() => { openLocationModal(record.id) }" style="padding-right: 10px">Location</a-button>
        <a-button type="primary" @click="(e) => { openModal(e, record.id) }">Edit</a-button>
        <a-popconfirm
          v-if="data.length"
          title="Are you sure you want to delete?"
          @confirm="() => { handleDelete(record.id) }">
          <a-button type="danger">Delete</a-button>
        </a-popconfirm>
      </template>
    </a-table>

    <a-modal
      title="Customer Request"
      :visible="modalState.visible"
      @ok="handleOkModal"
      :confirmLoading="modalState.confirmLoading"
      @cancel="handleCancelModal"
    >
      <a-form @submit="handleOkModal" layout="vertical" :autoFormCreate="(form)=>{this.form = form}">
        <a-form-item
          label='Name'
          fieldDecoratorId="name"
          :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input customer name!' }]}"
        >
          <a-input />
        </a-form-item>
        <a-form-item
          label='Pick up address'
          fieldDecoratorId="pickupAddress"
          :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input pick up address!' }]}"
        >
          <a-input />
        </a-form-item>
        <a-form-item
          label='Destination address'
          fieldDecoratorId="destAddress"
        >
          <a-input />
        </a-form-item>
        <a-form-item
          label='Phone number'
          fieldDecoratorId="phone"
        >
          <a-input />
        </a-form-item>
        <a-form-item
          label='Note'
          fieldDecoratorId="note"
        >
          <a-input type="textarea" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      title="Location Idenfity"
      :visible="modalLocationState.visible"
      @ok="handleOkLocationModal"
      :confirmLoading="modalLocationState.confirmLoading"
      @cancel="handleCancelLocationModal"
    >
      <div>
        <a-button type="primary" @click="findLocation">Find Location</a-button>
      </div>
      <div id="mapLocationIdentify" class="modal-map"></div>
    </a-modal>
  </div>
</template>

<script>
import { apiService } from '../services';
import { getList, getById, createOne, deleteOne, updateLocation } from '../services/customer-request';

const columns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: 'Customer name',
  dataIndex: 'name',
  sorter: true,
  width: '20%'
}, {
  title: 'Pick up address',
  dataIndex: 'pickupAddress',
}, {
  title: 'Destination address',
  dataIndex: 'destAddress',
}, {
  title: 'Phone',
  dataIndex: 'phone',
}, {
  title: 'Note',
  dataIndex: 'note',
}, {
  title: 'operation',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' },
}];

export default {
  name: 'customer-requests-component',
  components: {
  },
  mounted() {
    this.fetch();
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
      selectedObj: null,
      modalState: {
        visible: false,
        confirmLoading: false
      },
      modalLocationState: {
        visible: false,
        confirmLoading: false
      }
    }
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      // console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    },
    handleDelete (id) {
      if (id) {
        deleteOne(id).then(() => {
          this.fetch();
        });
      }
    },
    fetch (params = {}) {
      this.loading = true
      getList(params).then((result) => {
        const pagination = { ...this.pagination };
        this.loading = false;
        this.data = result;
        this.pagination = pagination;
      }).catch(() => this.loading = false);
    },
    openModal (event, id) {
      this.modalState.visible = true;
      setTimeout(() => {
        this.form.resetFields();
        if (id) {
          apiService({
              path: `/client-requests/${id}`,
              method: 'get',
              type: 'json',
            }).then((result) => {
              this.selectedObj = result.data;
              this.form.setFieldsValue(result.data);
            }).catch(() => this.selectedObj = undefined)
        } else {
          this.selectedObj = undefined;
        }
      }, 100)
    },
    handleOkModal (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const formData = { ...values };
          const opts = {
            path: '/client-requests',
            method: 'post',
            data: formData,
            type: 'json',
          }
          if (this.selectedObj && this.selectedObj.id) {
            opts.path = `/client-requests/${this.selectedObj.id}`
            opts.method = 'put'
          }
          apiService(opts).then(() => {
            this.modalState.visible = false;
            this.modalState.confirmLoading = false;
            this.form.resetFields();
            this.fetch();
          }).catch(() => this.modalState.confirmLoading = false);
        }
      })
    },
    handleCancelModal () {
      this.modalState.visible = false;
    },
    openLocationModal(id) {
      this.modalLocationState.visible = true;
      getById(id).then((result) => {
        console.log(result);
        this.selectedObj = result;
        const pickupLocation = {
          lat: result.pickupLat,
          lng: result.pickupLng
        };
        setTimeout(() => {
          this.initMap(pickupLocation, (currentPickupLocation) => {
            this.selectedObj.pickupLat = currentPickupLocation.lat;
            this.selectedObj.pickupLng = currentPickupLocation.lng;
          });
        }, 500);
      });
    },
    handleCancelLocationModal () {
      this.modalLocationState.visible = false;
    },
    handleOkLocationModal() {
      const pickupLocation = {
        lat: this.selectedObj.pickupLat,
        lng: this.selectedObj.pickupLng
      };
      updateLocation(this.selectedObj.id, 'updatePickupLocation', pickupLocation).then(() => {
        this.modalLocationState.visible = false;
        this.modalLocationState.confirmLoading = false;
        this.fetch();
      }).catch(() => this.modalLocationState.confirmLoading = false);
    },
    initMap(pickupLocation = {}, onChangePickupLocation) {
      const center = {lat:  10.762622, lng: 106.660172};
      const pickupPosition = center;
      if (pickupLocation.lat) {
        pickupPosition.lat = pickupLocation.lat;
      }
      if (pickupLocation.lng) {
        pickupPosition.lng = pickupLocation.lng;
      }
      this.map = new window.google.maps.Map(document.getElementById('mapLocationIdentify'), {zoom: 15, center: center});
      this.marker = new window.google.maps.Marker({
        position: center,
        map: this.map,
        draggable: true
      });
      this.map.addListener('click', (event) => {
        pickupPosition.lat = event.latLng.lat();
        pickupPosition.lng = event.latLng.lng();
        marker.setPosition(pickupPosition);
        if (typeof onChangePickupLocation === 'function') {
          onChangePickupLocation(pickupPosition);
        }
      });
      marker.addListener('dragend', (event) => {
        pickupPosition.lat = event.latLng.lat();
        pickupPosition.lng = event.latLng.lng();
        if (typeof onChangePickupLocation === 'function') {
          onChangePickupLocation(pickupPosition);
        }
      });
    },
    findLocation() {
      if (this.selectedObj && this.selectedObj.pickupAddress) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ 'address': this.selectedObj.pickupAddress }, function(results, status) {
          if (status == 'OK') {
            const geolocation = results[0].geometry.location;
            this.map.setCenter(geolocation);
            if (this.marker) {
              this.marker.setPosition(geolocation);
              this.selectedObj.pickupLat = geolocation.lat;
              this.selectedObj.pickupLng = geolocation.lng;
            }
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
    }
  }
}
</script>

<style>
.customer-requests-component {
}
.modal-map {
  width: 100%;
  height: 400px;
}
</style>
