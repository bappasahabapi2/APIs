"use strict";

const _ = require("underscore");
const Dao = require("../../util/dao");
const log = require("../../util/log");
const {API, SCHEMA, TABLE, CODE} = require("../../util/constant");
const {getRouteControllerConfigWithHandler} = require("../../util/apiCreateHelper");

const operationName = "Mother Limit List"

const client_list = async (request) => {
  let data = await get_client_list(request);
  log.info(`Get ${operationName}`);
  return {status: true, code: 200, data: data, message: ""};
};

const get_client_list = async (request) => {
  let data = null;
  let sql = {

    text:`
    select
    mlh.default_credit_limit as credit_limit,
	  mlh.default_disbursement_date as disbursement_date,

    al.status,
	  al.end_date as expiry_date,

    rm.name as rm_name,

    c.name as supplier_name,
	  c.id as supplier_id

    from ${SCHEMA.PUBLIC}.${TABLE.MOTHER_LIMIT_HISTORY} mlh
    join ${SCHEMA.PUBLIC}.${TABLE.MOTHER_LIMIT} ml on ml.id =mlh.id
    join ${SCHEMA.PUBLIC}.${TABLE.ANCHOR_LIMIT} al on al.mother_limit_id =ml.id
    join ${SCHEMA.PUBLIC}.${TABLE.RELATIONSHIP_MANAGER} rm on rm.id=ml.id
    join${SCHEMA.PUBLIC}.${TABLE.COMPANY} c on c.id =ml.id
    `,
    values:[]


    // text: `select l.id, l.name, l.address, r.approval_status, r.remarks from ${SCHEMA.PUBLIC}.${TABLE.COMPANY_PROFILE} l join 
    //       ${SCHEMA.PUBLIC}.${TABLE.MOTHER_LIMIT_SETUP} r on l.id = r.company_profile_id`,
    // values: []
  };
  try {
    data = await Dao.get_data(request.pg, sql);
  } catch (e) {
    log.error(`An exception occurred while executing ${operationName} : ${e?.message}`);
  }
  return data;
};

const route_controller = getRouteControllerConfigWithHandler('GET', API.MOTHER_LIMIT_LIST, false, operationName, {
  failCode: 400,
  operationName,
  handlerFunction: client_list
});

module.exports = route_controller;
