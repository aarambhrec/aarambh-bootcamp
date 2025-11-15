const express = require('express');
const router = express.Router();
const SiteConfig = require('../models/SiteConfig');
const { verifyAdmin } = require('./admin');

// Get site configuration
router.get('/', async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      // Create default config if none exists
      config = new SiteConfig({
        formFields: [],
        schedule: [],
        curriculum: [],
        bootcampDetails: [],
        bonusBenefits: [],
        siteInfo: {
          bootcampDate: new Date('2025-11-22'),
          bootcampTitle: 'Web Development Bootcamp',
          registrationOpen: true
        }
      });
      await config.save();
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update entire configuration (admin only)
router.put('/', verifyAdmin, async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      config = new SiteConfig(req.body);
    } else {
      Object.assign(config, req.body);
      config.updatedAt = Date.now();
    }
    await config.save();
    res.json({ message: 'Configuration updated successfully', config });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update form fields
router.put('/form-fields', verifyAdmin, async (req, res) => {
  try {
    const config = await SiteConfig.findOne();
    config.formFields = req.body.formFields;
    config.updatedAt = Date.now();
    await config.save();
    res.json({ message: 'Form fields updated successfully', formFields: config.formFields });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update schedule
router.put('/schedule', verifyAdmin, async (req, res) => {
  try {
    const config = await SiteConfig.findOne();
    config.schedule = req.body.schedule;
    config.updatedAt = Date.now();
    await config.save();
    res.json({ message: 'Schedule updated successfully', schedule: config.schedule });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update curriculum
router.put('/curriculum', verifyAdmin, async (req, res) => {
  try {
    const config = await SiteConfig.findOne();
    config.curriculum = req.body.curriculum;
    config.updatedAt = Date.now();
    await config.save();
    res.json({ message: 'Curriculum updated successfully', curriculum: config.curriculum });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update bootcamp details
router.put('/bootcamp-details', verifyAdmin, async (req, res) => {
  try {
    const config = await SiteConfig.findOne();
    config.bootcampDetails = req.body.bootcampDetails;
    config.updatedAt = Date.now();
    await config.save();
    res.json({ message: 'Bootcamp details updated successfully', bootcampDetails: config.bootcampDetails });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update site info
router.put('/site-info', verifyAdmin, async (req, res) => {
  try {
    const config = await SiteConfig.findOne();
    config.siteInfo = { ...config.siteInfo, ...req.body.siteInfo };
    config.updatedAt = Date.now();
    await config.save();
    res.json({ message: 'Site info updated successfully', siteInfo: config.siteInfo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update bonus benefits
router.put('/bonus-benefits', verifyAdmin, async (req, res) => {
  try {
    const config = await SiteConfig.findOne();
    config.bonusBenefits = req.body.bonusBenefits;
    config.updatedAt = Date.now();
    await config.save();
    res.json({ message: 'Bonus benefits updated successfully', bonusBenefits: config.bonusBenefits });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update contact info
router.put('/contact-info', verifyAdmin, async (req, res) => {
  try {
    const config = await SiteConfig.findOne();
    config.contactInfo = { ...config.contactInfo, ...req.body.contactInfo };
    config.updatedAt = Date.now();
    await config.save();
    res.json({ message: 'Contact info updated successfully', contactInfo: config.contactInfo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
