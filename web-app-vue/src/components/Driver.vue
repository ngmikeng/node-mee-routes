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
import { apiService } from '../services';

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
      apiService({
        path: '/drivers',
        method: 'get',
        params: {
          results: 10,
          ...params,
        }
      }).then((result) => {
        if (result && result.data) {
          const pagination = { ...this.pagination };
          // pagination.total = 200;
          this.loading = false;
          this.data = result.data;
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
    openModal (event, id) {
      this.modalState.visible = true;
      setTimeout(() => {
        this.form.resetFields();
        if (id) {
          axios({
              url: `http://localhost:5858/api/v1/drivers/${id}`,
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
            url: 'http://localhost:5858/api/v1/drivers',
            method: 'post',
            data: formData,
            type: 'json',
          }
          if (this.selectedObj && this.selectedObj.id) {
            opts.url = `http://localhost:5858/api/v1/drivers/${this.selectedObj.id}`
            opts.method = 'put'
          }
          axios(opts).then(() => {
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
    handleDelete(id) {
      axios({
        url: `http://localhost:5858/api/v1/drivers/${id}`,
        method: 'delete',
        type: 'json',
      }).then(() => {
        this.fetch();
      });
    }
  }
}
</script>

<style>
.driver-component {
}
</style>
