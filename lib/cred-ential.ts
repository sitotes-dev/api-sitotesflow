export function credsGoogle() {
    const type = "service_account"
    const project_id = "tokostockify"
    const private_key_id = "134bf5d200d7" +
        "28296590c929ac2" +
        "1e91a3e30220a"
    const private_key = "-----BEGIN PRIVATE KEY-----\n"+
        "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwgg"+
        "SiAgEAAoIBAQCnoRAnsvIuPD4o\nTJkxmZTGJ4waR"+
        "ZB0u+7RHFYj/9//ExpBe0FeXfDvbqDxAxHAIO7a0H"+
        "YOrx8Bwhzc\nkaDaoZfYNzGF44MkqQHV/+czRwbvJ"+
        "Gmfs+8wCWASiKVbRQR+KfTbJxMqk1e77+jY\ncvPF07"+
        "BjcazEFc5aeXjTHBWijiFBFMGop/zw5M0ZS3XruXHX2A3"+
        "GTVl/3Fe2Ur5s\n+GGXG847u/id7zrITY+VxDOAVH9l+c"+
        "Tr4BNAUczx0/OZNm4InqpNLiXyFrRGT4Py\nkMtN1TjF"+
        "8bi0mtoJv6n9oNtgbJK8NuohKnLVpC7+IXwbqDRPb6h"+
        "qscbdrFUEV4Ga\nCOLxJAIzAgMBAAECggEAP9frn7sbW"+
        "vmt0MpvtEDitV+9kAn7nUIwkGsi8b4UEYG0\nh8kKWgccaw"+
        "yu9mwtWAgTALrRpAEVpaVJOcarRWmzO/G1hmFjAtTts"+
        "pQu+cws+2ra\nYa11xU1kzlpF5E+SiPyw2cD1n0sT6Kv"+
        "Ueo+5gZiA/zb9zobhm3rVRk5VfR510uOX\niazk/1ZwU4i"+
        "XA/wt32YgL35Maq2XGLboCeqDgk1l/G3m5jz5ot2+tOhj+"+
        "wLIfTb2\nsZQdLy6nLYT25xUR2EXU7Q99pnE28BMxj27o"+
        "Eo8NO0jrte6ggWUQddCQAT87Vk/S\nVbVINbNFjERrDGh"+
        "FnM5dL44m4i5SM3in/XgQ2mC0ZQKBgQDVlZ3g8lIXjB"+
        "TPXCgK\nDxGBqij8HsPq+Iha/33LAoxKGlXUydQ2TUVkW"+
        "eHP4Z37aF+aDolVEwdNHmb1Fwzh\nlW+8ws4OCAwVpk"+
        "0oyHBTh52qVO/7g0lnWtzh6Dew7I/hsQnAik8oeTndRE6Zz"+
        "/E/\nYNW4k1TVdBkLn92mxReJDBCtPQKBgQDI6yIfWygQQ"+
        "K1qvvB8rOTjsQqzFJLkK/fD\nrceTwbGpRRtrjcpQDhjLHxgbbsS"+
        "CmydEo1TrcdxMPuOJQ6AYgVHWhYZojzgTjEUQ\n8wk"+
        "07LkAixt2LiFQ9eTcJWElt1chGO2o36TI4wiHZr0Ux1G1"+
        "EiuKB1vPchC8llFG\nyt7gXVBELwKBgCIsfERfwU7PNQ0"+
        "wm59wZcavaTtd2M8h0P9uXbw7viKlMBKJ8JB3\nsKCr"+
        "2PugB90QCCvoI4UfNE3cjXCtrXvyoxw6tyl7lCNqpnHeEErt"+
        "Kgb07Cj8CqSk\n3y6uLyr5ztO3te2+s4ewTdffdAwcP2d6o"+
        "PeVaz90AgXgIGDsrCVbbtepAoGAYkvf\nOtX/KMxry2C1CVo"+
        "Q9XCFWo3DO8xjACICFUDbKYQ84QbSpw3uhVmmEq3DiF"+
        "5d/M+n\n2TSwYcEW0u354mNKZZiX5InFFpM2qw8s"+
        "Pu9dp21nNw9kj1Zt7GKBP9GN2Ax5IXih\nBwNEBfJ2qT"+
        "bGu76y/GmTOk+E7q7f/rF8Duq4PVMCgYApTtvRqOg8tk"+
        "ESH1fzqrM4\nfWmnusb9Yrru0BMj/m9683YNhJ+I0JAtE"+
        "hsWSsNjy1+2nyAYOoacnkOMm+zPLZsq\nnmz5esSTpex"+
        "TOHv+187hzEYJR1kJMvO13v3i5mDEwjLl6Pn3lGrNEmd"+
        "RLL7VToo9\n3psrjDrJAvh3uQvo03bQQQ==\n-----END P"+
        "RIVATE KEY-----\n"
    const client_email = "sitotes-drive@"+
        "tokostockify.iam."+
        "gserviceaccount.com"
    const client_id = "11139634610"+
        "9110001186"
    const auth_uri = "https://accounts.google.com/"+
        "o/oauth2/auth"
    const token_uri = "https://oauth2"+
        ".googleapis."+
        "com/token"
    const auth_provider_x509_cert_url = "https://www."+
        "googleapis.com/"+
        "oauth2/v1/certs"
    const client_x509_cert_url = "https://www.googleapis.com/"+
        "robot/v1/metadata/x509/sitotes-drive%40tokostockify."+
        "iam.gserviceaccount.com"
    const universe_domain = "googleapis"+
        ".com"
        
    return {
        type,
        project_id,
        private_key_id,
        private_key,
        client_email,
        client_id,
        auth_uri,
        token_uri,
        auth_provider_x509_cert_url,
        client_x509_cert_url,
        universe_domain
    }
}