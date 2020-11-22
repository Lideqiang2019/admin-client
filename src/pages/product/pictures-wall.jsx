import React from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDeleteImg} from '../../api/index'
import { BASE_IMG_URL } from '../../utils/constants';
import PropTypes from 'prop-types'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends React.Component {
    static propTypes = {
        imgs:PropTypes.array
    }
    constructor(props){
        super(props)

        // const arr1 = []
        // const s1 = ''
        // console.log("arr1",arr1)
        // console.log("s1",s1)
        // console.log("arr1==s1?",arr1===s1)
        // console.log("s1===undefined",s1==undefined)
        // if(arr1){
        //     console.log("zifuchuancunzai")
        // }else{
        //     console.log("zifuchuan!")
        // }

        // 看看是否imgs是空数组
        const {imgs} = this.props
        let fileList = [] // 必须开始的时候定义数组，否则会出现undefined情况
        if(imgs&&imgs.length>0){
            // 如果imgs不是空，且数组中有值
            fileList = imgs.map((img,index)=>(
                {
                    uid: -index,// 标识是否显示大图预览Modal
                    name: img,// 大图的url
                    status: 'done',
                    url: BASE_IMG_URL+img,
                }
            ) 
            )
        }
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList
        }
    }

    /*
     获取上传图片名称的数组
     */
    getImgs = ()=>{
        return this.state.fileList.map(file=>file.name)
    }

    /*
    隐藏Modal
     */
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        console.log('handlePreview()', file)
        // 显示指定file对应的大图
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    /*
    file: 当前操作的图片文件(上传/删除)
    fileList: 所有已上传图片文件对象的数组
     */
    handleChange = async ({ file, fileList }) => {
        //   console.log("执行了这个")
        console.log('handleChange()', file, file.status, fileList.length, file === fileList[fileList.length - 1])
        this.setState({ fileList })
        // 一旦上传成功, 将当前上传的file的信息修正(name, url)
        if (file.status === 'done') {
            // 上传成功,需要将file的名字和url修改一下，并添加到fileList中
            const result = file.response  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
            if(result.status===0){
                file = fileList[fileList.length - 1]
                file.name = result.data.name
                file.url = result.data.url
            }else{
                message.error("图片上传失败")
            }
        }else if(file.status==='removed'){
            // 图片移除，发送请求，将后台的图片移除
            const result = await reqDeleteImg(file.name)
            if(result.status===0){
                message.success("图片删除成功！")
            }else{
                message.error("图片删除失败！")
            }
        }
}

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        // debugger
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    action="/manage/img/upload"/*上传图片的接口地址*/
                    accept='image/*'/*只接收图片格式*/
                    name='image' /*请求参数名*/
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}

