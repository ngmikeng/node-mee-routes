<template>
  <div class="customer-requests-component">
    <h1 class="header">Customer Requests</h1>
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
  </div>
</template>

<script>
import { getList, createOne, deleteOne } from '../services/customer-request';

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
      modalState: {
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
    openModal () {
      this.modalState.visible = true;
    },
    handleOkModal (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          createOne(values).then(() => {
            this.modalState.visible = false;
            this.modalState.confirmLoading = false;
            this.fetch();
          }).catch(() => this.modalState.confirmLoading = false);
        }
      })
    },
    handleCancelModal () {
      this.modalState.visible = false;
    }
  }
}
</script>

<style>
.customer-requests-component {
}
</style>
