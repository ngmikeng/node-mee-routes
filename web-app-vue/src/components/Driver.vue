<template>
	<div class="driver-component">
		<h1 class="header">Driver</h1>
		<div class="g-margin-bot-10">
      <a-button type="primary" @click="openModal">Add a Driver</a-button>
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
          @confirm="() => { handleDelete(record.key) }">
          <a-button type="danger">Delete</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <a-modal
      title="Driver"
      :visible="modalState.visible"
      @ok="handleOkModal"
      :confirmLoading="modalState.confirmLoading"
      @cancel="handleCancelModal"
    >
      <a-form @submit="handleOkModal" layout="vertical" :autoFormCreate="(form)=>{this.form = form}">
        <a-form-item
          label='Name'
          fieldDecoratorId="name"
          :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input driver name!' }]}"
        >
          <a-input />
        </a-form-item>
        <a-form-item
          label='Status'
          fieldDecoratorId="status"
        >
          <a-select @change="handleStatusChange">
            <a-select-option value="online">Online</a-select-option>
            <a-select-option value="offline">Offline</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
	</div>
</template>

<script>
import axios from 'axios';

const columns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  width: '20%',
  scopedSlots: { customRender: 'name' },
}, {
  title: 'Status',
  dataIndex: 'status',
}, {
  title: 'operation',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' },
}];

export default {
  name: 'driver',
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
    fetch (params = {}) {
      this.loading = true
      axios({
        url: 'http://localhost:5858/api/v1/drivers',
        method: 'get',
        params: {
          results: 10,
          ...params,
        },
        type: 'json',
      }).then((result) => {
        if (result && result.data) {
          const pagination = { ...this.pagination };
          // pagination.total = 200;
          this.loading = false;
          this.data = result.data.data;
          this.pagination = pagination;
        }
      }).catch(() => this.loading = false);
    },
    handleTableChange (pagination, filters, sorter) {
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
    handleStatusChange (value) {
      this.form.setFieldsValue({
        status: value,
      })
    },
    openModal () {
      this.modalState.visible = true;
    },
    handleOkModal (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          axios({
            url: 'http://localhost:5858/api/v1/drivers',
            method: 'post',
            data: values,
            type: 'json',
          }).then(() => {
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
.driver-component {
}
</style>
