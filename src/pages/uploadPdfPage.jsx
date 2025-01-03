import React, { useState, useCallback } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Template from '../components/template';
import Header from  '../components/header';
import Footer from '../components/footer';
import UploadPdfPageComponents from '../components/uploadPdfComponents';

function UploadPdfPage() {


    return (
      <div>
        <Header />
        <Template title="기이수 과목 관리" />
        <UploadPdfPageComponents />
        <Footer />
      </div>
    );
}

const styles = StyleSheet.create({

});

export default UploadPdfPage;