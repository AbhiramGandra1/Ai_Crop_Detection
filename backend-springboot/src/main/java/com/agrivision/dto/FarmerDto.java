package com.agrivision.dto;

import java.math.BigDecimal;

public class FarmerDto {
    private Long farmerId;
    private String name;
    private String phone;
    private String location;
    private BigDecimal farmSizeAcres;
    private String preferredLanguage;

    public FarmerDto() {}

    public Long getFarmerId() { return farmerId; }
    public void setFarmerId(Long farmerId) { this.farmerId = farmerId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public BigDecimal getFarmSizeAcres() { return farmSizeAcres; }
    public void setFarmSizeAcres(BigDecimal farmSizeAcres) { this.farmSizeAcres = farmSizeAcres; }
    public String getPreferredLanguage() { return preferredLanguage; }
    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }
}
