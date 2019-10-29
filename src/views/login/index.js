import { login } from '@/api/login'

export default {
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '用户名不能为空',  trigger: 'blur'},
            { min: 3, max: 6, message: '长度在 3 到 9 个字符', trigger: 'blur' }
          ],
          password: [
            {required: true, message: '密码不能为空',  trigger: 'blur'},
            { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            login(this.form.username, this.form.password).then(response => {
              const resp = response.data
              console.log(resp, '=============================');
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
