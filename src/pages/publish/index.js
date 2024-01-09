import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createArticleAPI, getArticleById, updateArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel' 

const { Option } = Select

const Publish = () => {
  // Get channel list
  const { channelList } = useChannel()

  // Form submission
  const onFinish = (formValue) => {
    console.log(formValue)
    // Check if the number of cover images matches the selected image type
    if (imageList.length !== imageType) return message.warning('Cover type does not match the number of images')
    const { title, content, channel_id } = formValue
    // 1. Format the form data as per the API documentation
    const reqData = {
      title,
      content,
      cover: {
        type: imageType, // Cover mode
        // The URL handling logic here is only for new additions
        // Editing requires different handling
        images: imageList.map(item => {
          if (item.response) {
            return item.response.data.url
          } else {
            return item.url
          }
        }) // Image list
      },
      channel_id
    }
    // 2. Call the API to submit
    // Choose different API calls for new articles and editing
    if (articleId) {
      // Update API
      updateArticleAPI({ ...reqData, id: articleId })
    } else {
      createArticleAPI(reqData)
    }
  }

  // Upload callback
  const [imageList, setImageList] = useState([])
  const onChange = (value) => {
    console.log('Uploading', value)
    setImageList(value.fileList)
  }

  // Switch image cover type
  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e) => {
    console.log('Switched cover type', e.target.value)
    setImageType(e.target.value)
  }

  // Populate data
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  // Get form instance
  const [form] = Form.useForm()
  useEffect(() => {
    // 1. Get data by id
    async function getArticleDetail() {
      const res = await getArticleById(articleId)
      const data = res.data
      const { cover } = data
      form.setFieldsValue({
        ...data,
        type: cover.type
      })
      // Why can't we populate the cover with the current approach?
      // Issue with data structure, set method -> { type: 3 }   { cover: { type: 3}}

      // Populate image list
      setImageType(cover.type)
      // Display images ({url:url})
      setImageList(cover.images.map(url => {
        return { url }
      }))
    }
    // Call this function for populating data only if there's an article id
    if (articleId) {
      getArticleDetail()
    }
    // 2. Call instance method to complete data population
  }, [articleId, form])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>Home</Link> },
            { title: `${articleId ? 'Edit' : 'Publish'} Article` },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter article title' }]}
          >
            <Input placeholder="Please enter article title" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="Channel"
            name="channel_id"
            rules={[{ required: true, message: 'Please select article channel' }]}
          >
            <Select placeholder="Please select article channel" style={{ width: 400 }}>
              {/* The value attribute is automatically collected as the submission field when the user selects */}
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="Cover">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>Single Image</Radio>
                <Radio value={3}>Three Images</Radio>
                <Radio value={0}>No Image</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
              listType: Determines the appearance style of the file selection box
              showUploadList: Control whether to display the upload list
            */}
            {imageType > 0 && <Upload
              listType="picture-card"
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              name='image'
              onChange={onChange}
              maxCount={imageType}
              fileList={imageList}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: 'Please enter article content' }]}
          >
            {/* Rich text editor */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="Please enter article content"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                Publish Article
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
