package com.agrivision.dto;

import java.math.BigDecimal;

public class SoilTestRequestDto {
    private Long farmerId;
    private Long cropId;
    private BigDecimal nValue;
    private BigDecimal pValue;
    private BigDecimal kValue;
    private BigDecimal ph;
    private String soilType;
    private BigDecimal organicCarbon;
    private BigDecimal moisturePercentage;

    public SoilTestRequestDto() {}

    public Long getFarmerId() { return farmerId; }
    public void setFarmerId(Long farmerId) { this.farmerId = farmerId; }
    public Long getCropId() { return cropId; }
    public void setCropId(Long cropId) { this.cropId = cropId; }
    public BigDecimal getnValue() { return nValue; }
    public void setnValue(BigDecimal nValue) { this.nValue = nValue; }
    public BigDecimal getpValue() { return pValue; }
    public void setpValue(BigDecimal pValue) { this.pValue = pValue; }
    public BigDecimal getkValue() { return kValue; }
    public void setkValue(BigDecimal kValue) { this.kValue = kValue; }
    public BigDecimal getPh() { return ph; }
    public void setPh(BigDecimal ph) { this.ph = ph; }
    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }
    public BigDecimal getOrganicCarbon() { return organicCarbon; }
    public void setOrganicCarbon(BigDecimal organicCarbon) { this.organicCarbon = organicCarbon; }
    public BigDecimal getMoisturePercentage() { return moisturePercentage; }
    public void setMoisturePercentage(BigDecimal moisturePercentage) { this.moisturePercentage = moisturePercentage; }
}
