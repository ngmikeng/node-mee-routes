<template>
  <div class="customer-points-component">
    <h1 class="header">Customer Points</h1>
    <div class="g-margin-bot-10">
      <a-button type="primary" @click="openModal">Add a Point</a-button>
    </div>
    <a-table :columns="columns"
      :rowKey="record => { return record.login.uuid }"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="name" slot-scope="name">
        {{name.first}} {{name.last}}
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="data.length"
          title="Are you sure you want to delete?"
          @confirm="() => { handleDelete(record.key) }">
          <a-button type="danger">Delete</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <a-modal
      title="Customer Point"
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
import axios from 'axios';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  width: '20%',
  scopedSlots: { customRender: 'name' },
}, {
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ],
  width: '20%',
}, {
  title: 'Email',
  dataIndex: 'email',
}, {
  title: 'operation',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' },
}];

export default {
  name: 'customer-points-component',
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
        this.data = this.data.filter(item => item.id !== id)
      }
    },
    fetch (params = {}) {
      // console.log('params:', params);
      this.loading = true
      axios({
        url: 'https://randomuser.me/api',
        method: 'get',
        params: {
          results: 10,
          ...params,
        },
        type: 'json',
      }).then((result) => {
        if (result && result.data) {
          const pagination = { ...this.pagination };
          pagination.total = 200;
          this.loading = false;
          this.data = result.data.results;
          this.pagination = pagination;
        }
      });
    },
    openModal () {
      this.modalState.visible = true;
    },
    handleOkModal () {
      this.modalState.confirmLoading = true;
      setTimeout(() => {
        this.modalState.visible = false;
        this.modalState.confirmLoading = false;
      }, 2000);
    },
    handleCancelModal () {
      this.modalState.visible = false;
    }
  }
}
</script>

<style>
.customer-points-component {
}
</style>
