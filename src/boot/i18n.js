import { createI18n } from 'vue-i18n'
import messagesEn from '../locales/en'
import messagesPt from '../locales/pt-BR'

const messages = { 
    en: messagesEn,
    pt: messagesPt,
}

const i18n = createI18n({
    locale: 'pt-BR',
    fallbackLocale: 'pt-BR',
    messages,
})

export default ({ app }) => {
    app.use(i18n);
}

export { i18n }